import React, { Component } from 'react';
import { connect } from 'react-redux'
import Popup from "reactjs-popup";
import { changeCategory } from '../actions/create_notecard_form'
import { addNotecard } from '../actions/notecard'

class createNotecardForm extends Component{

  constructor(props){
    super(props)
    console.log(props, "constructor");
    this.state={
      categoryName: "",
      subcategoryName: "",
      front: "",
      back: ""
    }
  }

  handleFormSubmit = (event) =>{
    event.preventDefault()
  }

  handleActualFormSubmit = (event) =>{
    fetch('http://localhost:3000/notecards', {
      method: "POST",
      headers:{
          "Content-type": "application/json"
      },
        body: JSON.stringify({user_id: this.props.user_id, category: this.state.categoryName, subcategory: this.state.subcategoryName, front: this.state.front, back:this.state.back})
      }
    ).then(res=> res.json())
    .then(data => this.props.addNotecard(data))

    // this.props.fetchDocument(this.props.user_id, this.state.categoryName.trim(), this.state.subcategoryName.trim())
    this.setState({front: "", back: ""})
  }

  handleInputChange = (event) =>{
    this.setState({[event.target.id]: event.target.value})
  }

  populateCategoryClick = () =>{
    console.log("hi");
    this.setState({categoryName: this.props.category})
  }

  populateBackClick = () =>{
    console.log("hi");
    this.setState({back:window.getSelection().toString()})
  }

  populateFrontClick = () =>{
    console.log("hi");
    this.setState({front:window.getSelection().toString()})
  }


  render(){
    console.log(this.state, "state of notecard");
    return(
        <Popup trigger={<button className="ui button"> Create Notecard Form </button>} modal>
          {close => (
            <div className="modal">
              <div className="header"> Create Notecard Form </div>
              <div className="content">
                <form class="ui form" onSubmit={this.handleFormSubmit} >

                  <label>Category</label><button onClick={this.populateCategoryClick}> click to populate category with current category </button>
                  <input type="text" id="categoryName" value={this.state.categoryName} onChange={this.handleInputChange} placeholder="Category name here..." />

                  <label>Subcategory</label>
                  <input type="text" id="subcategoryName" value={this.state.subcategoryName} onChange={this.handleInputChange} placeholder="subcategory name here..." />

                  <label>Front of Card</label><button onClick={this.populateFrontClick}>click to populate with highlighted text</button>
                  <textarea id="front" value={this.state.front} onChange={this.handleInputChange} placeholder="front text here..." >
                  </textarea>
                  <br/>
                  <label>Back of Card</label><button onClick={this.populateBackClick}>click to populate with highlighted text</button>
                  <textarea id="back" value={this.state.back} onChange={this.handleInputChange} placeholder="back text here..." ></textarea>

                  <br/><br/>
                    <button class="ui button" id="submit" type="text" onClick={this.handleActualFormSubmit}>Submit</button>
                    <button
                      className="ui button"
                      onClick={() => {
                        console.log('modal closed ')
                        close()
                      }}
                    >
                      cancel
                    </button>
                </form>
              </div>
            </div>
          )}
        </Popup>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    user_id: state.login.user_id,
    category: state.notecard.current_category
  }
}

export default connect(mapStateToProps, { changeCategory, addNotecard } )(createNotecardForm)
