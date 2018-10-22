import React, { Component } from 'react';
import Notecard from '../components/notecard'
import { connect } from 'react-redux'
import { setNotecards, setNotecardCategories, setNotecardSubCategories } from '../actions/notecard'

class Notecards extends Component{

  state={
    current_subcategory:"",
    current_deck: []
  }

  componentDidMount(){
    fetch(`http://localhost:3000/users/${this.props.user_id}`)
    .then(res=> res.json())
    .then(data => {
      this.props.setNotecards(data.notecards)
      this.props.setNotecardCategories(data.uniq_notecard_categories)
      this.props.setNotecardSubCategories(data.uniq_notecard_subcategories)
    })
  }

  handleSubcategoryClick = (event) =>{
    let clickedSub = event.target.id
    if (this.state.current_subcategory === clickedSub){
      this.setState({current_subcategory:""})
    }else{
    this.setState({current_subcategory: clickedSub, current_deck: this.props.notecards.filter(notecards => notecards.subcategory.name === clickedSub )})
    }
  }

  render(){
    const unique = (subCategory, index, self) => {
      return self.indexOf(subCategory) === index;
    }
    const noteCards = this.props.notecards
    return(
      <div class="ui grid">
        <div class='three wide column'>
        {noteCards ? this.props.notecard_categories.map(category =>
        <div class="ui list">
          <div class="item">
            <i class="folder icon"></i>
            <div class="content">
              <div class="header">{category}</div>
              <div class="list">
              {noteCards.filter(notecard=> notecard.category.name === category).map(nc=>nc.subcategory.name).filter(unique).map(subcategory =>
                <div class="item">
                {this.state.current_subcategory === subcategory ? <i class="folder open icon"></i> : <i class="folder icon"></i>}
                  <div class="content">
                    <div class="header" onClick={this.handleSubcategoryClick} id={subcategory} >{subcategory} </div>
                    <div class="list">
                    {this.state.current_subcategory === subcategory ? noteCards.filter(notecard => notecard.subcategory.name === subcategory).map(notecard =>
                      <div class="item">
                      <i class="clone icon"></i>
                        <div class="content">
                          <div class="header" id={notecard.id} >{notecard.front} {notecard.id} </div>
                        </div>
                      </div>
                    ) : null }
                    </div>
                  </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ): null }
      </div>
      <div class='stretched twelve wide column'>
      <div class='ui segment'>
          <Notecard deck={this.state.current_deck} />
        </div>
      </div>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    user_id: state.login.user_id,
    notecards: state.notecard.notecards,
    notecard_categories: state.notecard.notecard_categories,
    notecard_subcategories: state.notecard.notecard_subcategories
  }
}

export default connect(mapStateToProps, { setNotecards, setNotecardCategories, setNotecardSubCategories })(Notecards)
