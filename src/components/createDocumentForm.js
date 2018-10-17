import React, { Component,Fragment } from 'react';
import { connect } from 'react-redux'
import { addCategory, addDocument } from '../actions/page'

class CreateDocumentForm extends Component{

  state={
    showForm: false,
    categoryName: "",
    documentTitle: ""
  }

  handleClick = () => {
    this.setState({showForm: !this.state.showForm})
  }

  handleFormSubmit = (event) =>{
    event.preventDefault();

    fetch('http://localhost:3000/documents-and-category',{
        method: "POST",
        headers:{
          "Content-type": "application/json"
        },
        body: JSON.stringify({user_id: this.props.user_id, name: this.state.categoryName, title: this.state.documentTitle})
      }
    ).then(res => res.json())
    .then(data => {
      console.log(data)
      // this.props.addDocument(data.document)
      this.props.addCategory(data.category)
    })
  }

  handleInputChange = (event) =>{
    this.setState({[event.target.id]: event.target.value})
  }

  render(){
    return(
      <Fragment>
      <button class="ui button" onClick={this.handleClick}>Create a new document</button>
        {this.state.showForm ?
          <form onSubmit={this.handleFormSubmit}>
            <label>Category</label>
            <input type="text" id="categoryName" value={this.state.categoryName} onChange={this.handleInputChange} placeholder="Category name here..." />
            <br/>
            <label>Title</label>
            <input type="text" id="documentTitle" value={this.state.documentTitle} onChange={this.handleInputChange} placeholder="Document title here..." />
            <input type="submit" />
          </form>
            :
          null
        }
        <br/>
        <br/>
      </Fragment>
    )
  }

}

const mapStateToProps = (state) =>{
  return{
    user_id: state.login.user_id
  }
}



export default connect(mapStateToProps, { addCategory, addDocument })(CreateDocumentForm)
