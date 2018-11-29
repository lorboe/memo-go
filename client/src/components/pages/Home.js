import React, { Component } from 'react';
import Atom from "/Users/GG/Documents/SofDev/Ironhack/w8/Project_3/learning-app/client/src/images/science-icon_25410.png";
import Food from "/Users/GG/Documents/SofDev/Ironhack/w8/Project_3/learning-app/client/src/images/Food-icon_379338.png";
import Sport from "/Users/GG/Documents/SofDev/Ironhack/w8/Project_3/learning-app/client/src/images/Sport_icon_289620.svg";

class Home extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //   }
  // }
  render() {
    return (
      <div>
        {/* <div className="Home">
          <h2>Home</h2>
        </div>
        <div className="flexRow">
          <div className="">
            <div className="deck deckHome"></div>

          </div>
        </div>
        <hr /> */}

        <div className="iconCategories">
          <img src={Atom} style={{width: "7vh"}} />
        </div>
        <div className="flexRow">
          <div className="scrollFlex">
            <div className="deck deckHome"><img src={Atom} style={{backgroundSize: "cover", margin:"auto",}}/></div>
            <div className="deck deckHome"></div>
            <div className="deck deckHome"></div>
            <div className="deck deckHome"></div>
            <div className="deck deckHome"></div>
            <div className="deck deckHome"></div>
            <div className="deck deckHome"></div>
            <div className="deck deckHome"></div>
            <div className="deck deckHome"></div>
            <div className="deck deckHome"></div>
            <div className="deck deckHome"></div>
            <div className="deck deckHome"></div>
            <div className="deck deckHome"></div>
            <div className="deck deckHome"></div>
            <div className="deck deckHome"></div>
            <div className="deck deckHome"></div>
            <div className="deck deckHome"></div>
            <div className="deck deckHome"></div>
            <div className="deck deckHome"></div>
            <div className="deck deckHome"></div>
            <div className="deck deckHome"></div>
            <div className="deck deckHome"></div>
            <div className="deck deckHome"></div>
            <div className="deck deckHome"></div>
            <div className="deck deckHome"></div>
          </div>
        </div>
        <hr />

        <div className="iconCategories">
          <img src={Food} style={{width: "7vh"}} />
        </div>
        <div className="flexRow">
          <div className="scrollFlex">
            <div className="deck deck1 deckHome"><img src={Food} style={{width: "14vh", backgroundSize: "cover", margin: "auto",}} /></div>
            <div className="deck deck1 deckHome"></div>
            <div className="deck deck1 deckHome"></div>
            <div className="deck deck1 deckHome"></div>
            <div className="deck deck1 deckHome"></div>
            <div className="deck deck1 deckHome"></div>
            <div className="deck deck1 deckHome"></div>
            <div className="deck deck1 deckHome"></div>
            <div className="deck deck1 deckHome"></div>
            <div className="deck deck1 deckHome"></div>
            <div className="deck deck1 deckHome"></div>
            <div className="deck deck1 deckHome"></div>
            <div className="deck deck1 deckHome"></div>
            <div className="deck deck1 deckHome"></div>
            <div className="deck deck1 deckHome"></div>
            <div className="deck deck1 deckHome"></div>
            <div className="deck deck1 deckHome"></div>
            <div className="deck deck1 deckHome"></div>
            <div className="deck deck1 deckHome"></div>
            <div className="deck deck1 deckHome"></div>
            <div className="deck deck1 deckHome"></div>
            <div className="deck deck1 deckHome"></div>
            <div className="deck deck1 deckHome"></div>
            <div className="deck deck1 deckHome"></div>
            <div className="deck deck1 deckHome"></div>
          </div>
        </div>
        <hr />

        <div className="iconCategories">
          <img src={Sport} style={{width: "7vh"}} />
        </div>
        <div className="flexRow">
          <div className="scrollFlex">
            <div className="deck deck2 deckHome"><img src={Sport} style={{width: "14vh", backgroundSize: "cover", margin: "auto",}} /></div>
            <div className="deck deck2 deckHome"></div>
            <div className="deck deck2 deckHome"></div>
            <div className="deck deck2 deckHome"></div>
            <div className="deck deck2 deckHome"></div>
            <div className="deck deck2 deckHome"></div>
            <div className="deck deck2 deckHome"></div>
            <div className="deck deck2 deckHome"></div>
            <div className="deck deck2 deckHome"></div>
            <div className="deck deck2 deckHome"></div>
            <div className="deck deck2 deckHome"></div>
            <div className="deck deck2 deckHome"></div>
            <div className="deck deck2 deckHome"></div>
            <div className="deck deck2 deckHome"></div>
            <div className="deck deck2 deckHome"></div>
            <div className="deck deck2 deckHome"></div>
            <div className="deck deck2 deckHome"></div>
            <div className="deck deck2 deckHome"></div>
            <div className="deck deck2 deckHome"></div>
            <div className="deck deck2 deckHome"></div>
            <div className="deck deck2 deckHome"></div>
            <div className="deck deck2 deckHome"></div>
            <div className="deck deck2 deckHome"></div>
            <div className="deck deck2 deckHome"></div>
            <div className="deck deck2 deckHome"></div>
          </div>
        </div>
        <hr />

      </div>
    );
  }
}

export default Home;
