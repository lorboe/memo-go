import React, { Component } from "react";
import { Button } from "reactstrap";
import api from "../../api";
import Flip from '../../../src/images/original/Flip.svg'

class Learn extends Component {
  constructor(props) {
    super(props);
    this.toggleClass = this.toggleClass.bind(this);
    this.state = {
      deck: null,
      cards: [],
      iVisibleCard: 0,
      isFlipped: false,
      active: false,

    };
  }

  toggleClass() {
    const currentState = this.state.active;
    this.setState({ 
      active: !currentState,
    });
  };


  // handleFlipClick(iClicked) {
  //   this.setState({
  //     isFlipped: !this.state.isFlipped
  //   })
  // }

  goToAnotherCard(delta) {
    let animationDuration = this.state.active ? 1000 : 0
    let newIVisibleCard = this.state.iVisibleCard + delta
    if (newIVisibleCard < 0) newIVisibleCard = 0
    if (newIVisibleCard >= this.state.cards.length) newIVisibleCard = this.state.cards.length - 1
    this.setState({
      active: false,
      // iVisibleCard: newIVisibleCard,
    })
    setTimeout(() => {
      this.setState({
        iVisibleCard: newIVisibleCard,
      })
    }, animationDuration / 2)
  }

  render() {
    if (!this.state.deck || !this.state.cards) {
      return <div>Loading...</div>;
    }
    let visibleCard = this.state.cards[this.state.iVisibleCard]

    if (!visibleCard) {
      return <div>There are no cards in this deck</div>
    }

    return (
      <div className="margin-top">
     
<div>{this.state.iVisibleCard}/{this.state.cards.length}</div>

        <div className="cardTitle center">
          <div id="cardFlip">
            <div id="card"
              className={this.state.active ? "do-flip" : null}
              // onClick={this.toggleClass}
            >
              <div className="frame">
                {!this.state.isFlipped && <div className="cardTitle center">{visibleCard.question}</div>}
                {/* <button id="flip-card-btn-turn-to-front"
                  onClick={() => this.handleFlipClick(this.state.iVisibleCard)}>flip</button> */}
              </div>

              <div className="frame back">
                {!this.state.isFlipped && <div className="cardTitle center">{visibleCard.answers[0]}</div>}
              </div>
                {/* <button id="flip-card-btn-turn-to-back"
                  onClick={() => this.handleFlipClick(this.state.iVisibleCard)}>flip</button> */}
            </div>
          </div>
        </div>
          {/* <button><img src={ Flip } style={{width: "3vh"}}/></button> */}
        {<Button outline color="info" onClick={this.toggleClass}><img src={ Flip } style={{width: "3vh"}}/></Button>}
        {this.state.iVisibleCard > 0 && <Button outline color="info" onClick={() => this.goToAnotherCard(-1)}>Previous</Button>}
        {this.state.iVisibleCard < this.state.cards.length - 1 && <Button outline color="info" onClick={() => this.goToAnotherCard(1)}>Next</Button>}

      </div>
    );
  }

  componentDidMount() {
    function shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }
    let deckId = this.props.match.params.deckId;
    api.getDeckDetail(deckId).then(data => {
      console.log(data);
      this.setState({
        deck: data.deckDoc,
        currUser: data.user,
        cards: shuffle(data.deckDoc.cards)
      });
    });
  }
}
export default Learn;