import React, { Component } from 'react';
import api from '../../api';


class EditDeck extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      category: "",
      difficulty: "",
      visibility: "",
      // description: "",
      message: null,
      pictureUrl: ""
    }
  }

  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value
    })
  }

  handleClick(e) {
    e.preventDefault()
    let dataFromForm = {
      title: this.state.title,
      category: this.state.category,
      difficulty: this.state.difficulty,
      visibility: this.state.visibility,
    }
        this.props.onSubmitDeckChanges(dataFromForm)
        // this.props.handleEditDeck(data)
  }

  render() {
    return (
      <div className="EditDeck">
            <form>
              {/* <img
                style={{ width: "150px", height: "150px" }}
                src={this.props.pictureUrl}
                alt="owner picture"
              /> */}
              <br/><br/>
           Title: <br/>
           <input type="text" value={this.state.title} onChange={(e) => { this.handleInputChange("title", e) }} />
           
          Category:<select className="selectBox" onChange={(e) => { this.handleInputChange("category", e) }} value={this.state.category}>
                <option value="web developmenet"> web development</option>
                <option value="languages">languages</option>
                <option value="business">business</option>
                <option value="other">other</option>
              </select>
           
          Difficulty:<select className="selectBox" onChange={(e) => { this.handleInputChange("difficulty", e) }} value={this.state.difficulty}>
                <option value="beginner">beginner</option>
                <option value="advanced-beginner">advanced-beginner</option>
                <option value="experienced">experienced</option>
                <option value="expert">expert</option>
            </select>
          Visibility: <select className="selectBox" onChange={(e) => { this.handleInputChange("visibility", e) }} value={this.state.visibility}>
                <option value="public">public</option>
                <option value="private">private</option>
            </select>
            <button onClick={(e) => this.handleClick(e)}>Save Changes</button>
          </form>
          
        </div>      
      

  
    );
  }
  componentDidMount() {
    let id = this.props.deckId
    api.getDeckDetail(id)
      .then(data => {
        this.setState({
          title: data.deckDoc.title,
          category: data.deckDoc.category,
          difficulty: data.deckDoc.difficulty,
          visibility: data.deckDoc.visibility,
          pictureUrl: data.deckDoc._owner.pictureUrl
        })
      })
  }
}

export default EditDeck;
