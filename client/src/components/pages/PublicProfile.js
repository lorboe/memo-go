import React, { Component } from 'react'
import api from '../../api'
import { Link } from 'react-router-dom'

export default class PublicProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            decks: [],
            search: "",
            pictureUrl:"",
            name:""
        }
    }

    componentDidMount() {
        api.getDecks()
            .then(data => {
                this.setState({
                    decks: data.decks,
                    name: data.user.name,
                    pictureUrl: data.decks[0]._owner.pictureUrl
                })

            })
    }

    handleSearch = (newSearch) => {
        this.setState({
          search: newSearch
        })
      }

    render() {
        console.log("hello from public profile")
        let userId = this.props.match.params.userId;
        console.log("userId" + userId)
        let sortedDecks = this.state.decks.sort((a, b) => a.category > b.category ? 1 : -1).filter(deck => deck.title.toUpperCase().includes(this.state.search.toUpperCase()))
        let tableContent = [];
        for (let i = 0; i < sortedDecks.length; i++) {
            if (i === 0 || sortedDecks[i].category !== sortedDecks[i - 1].category) {
                
                tableContent.push(
                    <div key={"c-" + i} className="iconCategories">
                            {/* <img src={Atom} style={{ width: "7vh" }} /> */}
                            {sortedDecks[i].category}
                        </div>
                    )
                    console.log("hello")
                }
                if (sortedDecks[i].visibility === "public") {
                 if (userId === sortedDecks[i]._owner._id) {
                    tableContent.push(
                        <div className="flexRow flexShadow">
                            <div className="scrollFlex">
                                <div className="deck deckHome">
                                    <Link to={`/public-profile/${sortedDecks[i]._owner._id}`}><img className="picOnDeck" src={sortedDecks[i]._owner.pictureUrl} alt="pictures" /></Link>
                                    <Link to={`/details/${sortedDecks[i]._id}`}>{sortedDecks[i].title}</Link>
                                </div>

                            </div>
                        </div>
                    )
                }
            }
        }


        return (
            <div>
                 <input
          name="searchbar"
          type="text"
          placeholder="Search"
          value={this.state.search}
          onChange={e => this.handleSearch(e.target.value)}
        />
                <div className="Profile">
                    <h2>{this.state.name}</h2>

                    <img className="picProfile" src={this.state.pictureUrl} alt="profile picture" />
                    <div>
                        <botton className="info">
                            <i className="far fa-heart" style={{ color: "white" }}></i>
                        </botton>
                    </div>

                    {this.state.message && <div className="info">
                        {this.state.message}
                    </div>}
                    <div>
                        Decks:

                        <div>
                            {tableContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
