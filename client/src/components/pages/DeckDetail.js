import React, { Component } from "react";
import api from "../../api";
import { Link } from "react-router-dom";
import AddCard from "./AddCard";
import EditDeck from "./EditDeck";
import SelectDeck from './SelectDeck'

class DeckDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: null,
      currUser: null,
      isFormVisible: true,
      isDeckEditFormVisible: false,
      // isCopyCardVisibile: false,
      indexCopyCard: null,
      idCopyCard: null,
      nbOfLikes: 0,
      rateHard: 0,
      rateEasy: 0,
      // favorite: 0,
    };
  }

  addLikes() {
    this.setState({
      nbOfLikes: this.state.nbOfLikes + 1
    })
  }

  addRateHard() {
    this.setState({
      rateHard: this.state.rateHard + 1
    })
  }

  addRateEasy() {
    this.setState({
      rateEasy: this.state.rateEasy + 1
    })
  }

  handleClick() {
    if (this.state.isFormVisible === false)
      this.setState({
        isFormVisible: true
      });
    else
      this.setState({
        isFormVisible: false
      });
  }

  handleEditDeckChanges(dataFromForm) {
    this.handleEditDeckClick();
    this.handleEditDeck(dataFromForm);
  }
  handleEditDeckClick() {
    if (this.state.isDeckEditFormVisible === true)
      this.setState({
        isDeckEditFormVisible: false
      });
    else
      this.setState({
        isDeckEditFormVisible: true
      });
  }

  handleEditDeck(dataFromForm) {
    api.updateDeck(this.state.deck._id, dataFromForm).then(data => {
      console.log("SUCCESS!", data);
      this.setState({
        deck: data.deckDoc,
        currUser: data.user,
        message: `Your deck '${this.state.title}' has been updated`
      });
    });
  }

  handleDelete(idClicked) {
    api
      .deleteCard(idClicked)
      .then(data => {
        console.log("Delete", data);
        this.setState({
          // The new cards are the ones where their _id are diffrent from idClicked
          deck: {
            ...this.state.deck,
            cards: this.state.deck.cards.filter(card => card._id !== idClicked)
          }
        });
      })
      .catch(err => {
        console.log("ERROR", err);
      });
  }

  //EDITING CARDS
  handleCardEdit(idClicked) {
    // Redirects the user to '/edit-card/'+idClicked
    this.props.history.push("/edit-card/" + idClicked);
  }

  handleAdd = card => {
    this.setState({
      deck: {
        ...this.state.deck,
        cards: [...this.state.deck.cards, card]
      }
    });
  };

  handleCopyCard(index, idCard) {
    console.log(idCard)
    let isTheSameIndex = index === this.state.indexCopyCard
    this.setState({
      // isCopyCardVisibile: !this.state.isCopyCardVisibile,
      indexCopyCard: isTheSameIndex ? null : index,
      idCopyCard: idCard
    })
  }

  
  render() {
    if (!this.state.deck && !this.state.currUser) return <div>Loading...</div>;
    let deckId=this.state.deck._id

    return (
      <div>
        
        <button><Link to={`/${deckId}/learn`}>Learn</Link></button>
        {!this.state.isDeckEditFormVisible && (
          <div className="flexWrap justCenter">
            <div className="flexBasic">
              <div className="deck deckHome">
                <img
                  style={{ width: "150px", height: "150px" }}
                  src={this.state.deck._owner.pictureUrl}
                  alt="owner picture"
                />
                {this.state.deck.title}
              </div>
              <div className="deckDetail">
                <div className="deckInfo">
                  Category: {this.state.deck.category}
                  <br />
                  Difficulty: {this.state.deck.difficulty}
                  <br />
                  Is this deck public?{" "}
                  {this.state.deck.visibility === "private" ? "No" : "Yes"}
                  <br />
                </div>
                <div className="justCenter">
                  <button onClick={() => this.addRateHard()} style={{ border: "transparent", boxShadow: "none", margin:"auto" }}>
                    <i style={{ marginRight: "5px" }} className="far fa-frown-open"></i>{this.state.rateHard}
                  </button>

                  <button onClick={() => this.addRateEasy()} style={{ border: "transparent", boxShadow: "none", margin:"auto" }}>
                    <i style={{ marginRight: "5px" }} className="far fa-smile-beam"></i>{this.state.rateEasy}
                  </button>

                  <button onClick={() => this.addLikes()} style={{ border: "transparent", boxShadow: "none", margin:"auto" }}>
                    <i style={{ marginRight: "5px" }} className="far fa-thumbs-up"></i>{this.state.nbOfLikes}
                  </button>
                </div>
              </div>
            </div>
          </div>
          )
        }

        <div>
          {this.state.currUser && this.state.deck._owner._id === this.state.currUser._id && (
            <button
              onClick={() =>
                this.handleEditDeckClick()

              }
            >
              Edit Deck
            </button>
          )}

          {this.state.currUser && this.state.deck._owner._id === this.state.currUser._id &&
            !!this.state.isDeckEditFormVisible && (
              <div>
                <EditDeck
                  deckId={this.props.match.params.deckId}
                  onSubmitDeckChanges={dataFromForm =>
                    this.handleEditDeckChanges(dataFromForm)
                  }
                />
              </div>
            )}
        </div>

        <div className="cardLinks">
          {this.state.currUser && this.state.deck._owner._id === this.state.currUser._id && (
            <button onClick={() => this.handleClick()}>New card</button>
          )}

          {this.state.currUser && this.state.deck._owner._id === this.state.currUser._id &&
            !!this.state.isFormVisible && (
              <div>
                <AddCard
                  deckId={this.props.match.params.deckId}
                  onAdd={this.handleAdd}
                />
              </div>
            )}
        </div>



        <div className="flexWrap justCenter">
          <div className="cardLinks justCenter">
            <hr />
            {/* <div id="cardContainer"></div> */}
            {this.state.deck &&
              this.state.deck.cards.map((card, i) => (
                <div key={card._id} className="flexWrap justCenter">
                  <div style={{ fontWeight: "bold" }} id="cardContainer">
                    {card.question}
                  </div>
                  <div id="cardContainer">{card.answers}</div>

                    {api.isLoggedIn() && this.state.currUser && this.state.deck._owner._id === this.state.currUser._id && (
                    <div>
                        <button onClick={() => this.handleCardEdit(card._id)}>
                          <i className="fas fa-cog" />
                        </button>
    
                        <button onClick={() => this.handleDelete(card._id)}>
                          <i className="fas fa-trash" />
                        </button>

                    </div>)}
                 

                    {api.isLoggedIn() &&  <button onClick={() => this.handleCopyCard(i, card._id)}>
                        <i className="fas fa-clone"></i> 
                        </button>}

                    {api.isLoggedIn() && this.state.indexCopyCard === i && 
                  <SelectDeck
                  cardId={this.state.idCopyCard}>

                  </SelectDeck>
                      }
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    let id = this.props.match.params.deckId;
    api.getDeckDetail(id).then(data => {
      console.log(data);
      this.setState({
        deck: data.deckDoc,
        currUser: data.user,
        isCopyCardVisibile: false
      });
    });
  }
}

export default DeckDetail;
