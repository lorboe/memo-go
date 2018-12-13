import React, { Component } from 'react'
import api from '../../api'
import { Link } from 'react-router-dom'

export default class PublicProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            decks: [],
            search: "",
           _owner: null
        }
    }


    componentDidMount() {
        // TODO: get the decks of the current person
        api.getDecks()
            .then(data => {
                this.setState({
                    // The filter is useless if the API returns directly the useful information
                    decks: data.decks.filter(deck => deck._owner._id === this.props.match.params.userId),
                    // _owner: data.decks.filter(deck =>  {if (deck._owner._id === this.props.match.params.userId) return true},
                    // ),
                })
                // console.log(this.state._owner)
                
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
    //    let  owner ;
        for (let i = 0; i < sortedDecks.length; i++) {
            if (i === 0 || sortedDecks[i].category !== sortedDecks[i - 1].category) {

                tableContent.push(
                    <div key={"c-" + i} className="iconCategories">
                        {/* <img src={Atom} style={{ width: "7vh" }} /> */}
                        <h3>{sortedDecks[i].category}</h3>
                    </div>
                )
                console.log("hello")
            }
            if (sortedDecks[i].visibility === "public") {
                tableContent.push(
                    // <div className="flexRow flexShadow">
                    //     <div className="scrollFlex">
                    <div className="deck deckHome">
                        <Link to={`/public-profile/${sortedDecks[i]._owner._id}`}><img className="picOnDeck" src={sortedDecks[i]._owner.pictureUrl} alt="pictures" /></Link>
                        <Link to={`/details/${sortedDecks[i]._id}`}>{sortedDecks[i].title}</Link>
                    </div>

                    //     </div>
                    // </div>
                )
            }
        }


let owner
let piiicture
this.state.decks.forEach(one=> {
    
    if (one._owner._id === this.props.match.params.userId ) {
        
        owner = one._owner.name
        piiicture = one._owner.pictureUrl
    }
    
    // console.log()
    // console.log(one._owner.pictureUrl)
    console.log(owner)
})


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
                    <h2>{owner}</h2>

                    <img className="picProfile" src={piiicture} alt="profile picture" />
                    <div>
                        <botton className="info">
                            <i className="far fa-heart" style={{ color: "#22a6b0" }}></i>
                        </botton>
                    </div> 

                    {this.state.message && <div className="info">
                        {this.state.message}
                    </div>}
                    <div style={{margin: "5vh"}}>
                        <h2 style={{color: "#22a6b0"}}>Decks:</h2>

                        {/* <div> */}
                        {tableContent}
                        {/* </div> */}
                    </div>
                </div>
            </div>
        )
    }
}
