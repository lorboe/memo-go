import React, { Component } from "react";
import { Button } from "reactstrap";
import api from "../../api";
// import FlipCard from 'react-flipcard';

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
    this.setState({ active: !currentState });
  };


  handleFlipClick(iClicked) {
    this.setState({
      isFlipped: !this.state.isFlipped

    })
  }

  goToAnotherCard(delta) {
    let newIVisibleCard = this.state.iVisibleCard + delta
    if (newIVisibleCard < 0) newIVisibleCard = 0
    if (newIVisibleCard >= this.state.cards.length) newIVisibleCard = this.state.cards.length - 1
    this.setState({
      iVisibleCard: newIVisibleCard,
      isFlipped: false
    })
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
      <div>
        <div className="flip-card-3D-wrapper">
        <div id="cardFlip"
          className={this.state.active ? "do-flip" : null}
          onClick={this.toggleClass}
        >
          <div className="flip-card-front">
            {!this.state.isFlipped && <div className="cardTitle">{visibleCard.question}</div>}
            <button id="flip-card-btn-turn-to-front"
              onClick={() => this.handleFlipClick(this.state.iVisibleCard)}>flip</button>
          </div>

        </div>
        <div className="flip-card-back">
          {this.state.isFlipped && <div>{visibleCard.answers}</div>}
          <button id="flip-card-btn-turn-to-back"
            onClick={() => this.handleFlipClick(this.state.iVisibleCard)}>flip</button>
        </div>
        </div>
        {this.state.iVisibleCard > 0 && <Button outline color="info" onClick={() => this.goToAnotherCard(-1)}>Previous</Button>}
        {this.state.iVisibleCard < this.state.cards.length - 1 && <Button outline color="info" onClick={() => this.goToAnotherCard(1)}>Next</Button>}

      </div>
    );
  }

  componentDidMount() {
    let deckId = this.props.match.params.deckId;
    api.getDeckDetail(deckId).then(data => {
      console.log(data);
      this.setState({
        deck: data.deckDoc,
        currUser: data.user,
        cards: data.deckDoc.cards
      });
    });
  }
}
export default Learn;
