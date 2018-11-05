import React, { Component } from 'react';
import Notecard from '../components/notecard'
import { connect } from 'react-redux'
import { setNotecards, setNotecardCategories, setNotecardSubCategories, setCurrentDeck, removeNotecard, removeNotecardFromDeck } from '../actions/notecard'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

class Notecards extends Component{

  state={
    current_subcategory:""
  }

  componentDidMount(){
    fetch(`https://warm-wave-64099.herokuapp.com/users/${this.props.user_id}`)
    .then(res=> res.json())
    .then(data => {
      this.props.setNotecards(data.notecards)
      this.props.setNotecardCategories(data.uniq_notecard_categories)
      this.props.setNotecardSubCategories(data.uniq_notecard_subcategories)
    })
  }

  handleSubcategoryClick = (event) =>{
    let clickedSub = event.target.id
    let deck = this.props.notecards.filter(notecards => notecards.subcategory.name === clickedSub)
    if (this.state.current_subcategory === clickedSub){
      this.setState({current_subcategory:""})
    }else{
    this.setState({current_subcategory: clickedSub})
    this.props.setCurrentDeck(deck)
    }
  }

  handleNotecardDelete = (event) =>{
    let notecard_id = event.target.id
    confirmAlert({
      title: 'Click Yes to confirm',
      message: 'Are you sure you want to delete this notecard?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            fetch(`https://warm-wave-64099.herokuapp.com/notecards/${notecard_id}`,{
              method: "DELETE"
            }).then(res=> {
            if (res.ok) {
              this.props.removeNotecard(parseInt(notecard_id, 10))
              this.props.removeNotecardFromDeck(parseInt(notecard_id, 10))
            } else {
              return Promise.reject({ status: res.status, statusText: res.statusText });
            }
          })
          }
        },
        {
          label: 'No',
          onClick: () => null
        }
      ]
    })
  }

  render(){
    const unique = (subCategory, index, self) => {
      return self.indexOf(subCategory) === index;
    }
    const styles1 = {
      margin: '20px'
    }

    const noteCards = this.props.notecards
    return(
      <div class="ui grid">
        <div class='three wide column'>
        {noteCards && this.props.notecard_categories ? this.props.notecard_categories.map(category =>
        <div class="ui list" style={styles1}>
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
                          <div class="header" id={notecard.id} >{notecard.front}<button class="ui mini inverted icon button" id={notecard.id} onClick={this.handleNotecardDelete}><i id={notecard.id} class="trash icon"></i></button>
                          </div>
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
      <div class='ui segment cardss'>
          <Notecard deck={this.props.current_deck} />
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
    notecard_subcategories: state.notecard.notecard_subcategories,
    current_deck: state.notecard.current_deck
  }
}

export default connect(mapStateToProps, { setNotecards, setNotecardCategories, setNotecardSubCategories, setCurrentDeck, removeNotecard, removeNotecardFromDeck })(Notecards)
