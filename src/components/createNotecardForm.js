import React, { Component } from 'react';
import { connect } from 'react-redux'
import Popup from "reactjs-popup";
import { changeCategory } from '../actions/create_notecard_form'
import { addNotecard, addNotecardCategory, addNotecardSubcategory } from '../actions/notecard'
import { API_ROOT, HEADERS } from '../constants';

class createNotecardForm extends Component{

  state={
    categoryName: "",
    subcategoryName: "",
    front: "",
    back: ""
  }


  handleFormSubmit = (event) =>{
    event.preventDefault()
  }

  handleActualFormSubmit = (event) =>{
    fetch(`${API_ROOT}/notecards`, {
      method: "POST",
      headers: HEADERS,
        body: JSON.stringify({user_id: this.props.user_id, category: this.state.categoryName, subcategory: this.state.subcategoryName, front: this.state.front, back:this.state.back})
      }
    ).then(res=> res.json())
    .then(data => {
      this.props.addNotecardCategory(data.category.name)
      this.props.addNotecardSubcategory(data.subcategory.name)
      this.props.addNotecard(data)
    })

    this.setState({front: "", back: ""})
  }

  handleInputChange = (event) =>{
    this.setState({[event.target.id]: event.target.value})
  }

  populateCategoryClick = () =>{
    this.setState({categoryName: this.props.category})
  }

  populateBackClick = () =>{
    this.setState({back:window.getSelection().toString()})
  }

  populateFrontClick = () =>{
    this.setState({front:window.getSelection().toString()})
  }

  render(){
    return(
        <Popup trigger={<button className="ui button"> Create Notecard Form </button>} modal>
          {close => (
            <div className="ui red segment">
              <div className="header"> Create Notecard Form </div>
              <br/>
              <div className="content">
                <form class="ui form" onSubmit={this.handleFormSubmit} >

                  <label>Category</label>       <button class="mini ui black basic button" onClick={this.populateCategoryClick}> click to populate category with current category </button>
                  <br/>
                  <input type="text" id="categoryName" value={this.state.categoryName} onChange={this.handleInputChange} placeholder="Category name here..." />
                  <br/>
                  <br/>
                  <label>Subcategory</label>
                  <input type="text" id="subcategoryName" value={this.state.subcategoryName} onChange={this.handleInputChange} placeholder="subcategory name here..." />
                  <br/>
                  <br/>
                  <label>Front of Card</label>      <button class="mini ui black basic button" onClick={this.populateFrontClick}>click to populate with highlighted text</button>
                  <textarea id="front" value={this.state.front} onChange={this.handleInputChange} placeholder="front text here..." >
                  </textarea>
                  <br/>
                  <br/>
                  <label>Back of Card</label>       <button class="mini ui black basic button" onClick={this.populateBackClick}>click to populate with highlighted text</button>
                  <textarea id="back" value={this.state.back} onChange={this.handleInputChange} placeholder="back text here..." ></textarea>

                  <br/><br/>
                    <button class="ui positive basic button" id="submit" type="text" onClick={this.handleActualFormSubmit}>Submit</button>
                    <button
                      className="ui negative basic button"
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

export default connect(mapStateToProps, { changeCategory, addNotecard, addNotecardCategory, addNotecardSubcategory } )(createNotecardForm)
