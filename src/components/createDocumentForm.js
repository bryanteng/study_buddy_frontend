import React, { Component,Fragment } from 'react';
import { connect } from 'react-redux'
import { addCategory, addDocument } from '../actions/page'
import { fetchDocument } from '../actions/create_document_form'

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

    this.props.fetchDocument(this.props.user_id, this.state.categoryName.trim(), this.state.documentTitle.trim())
    this.setState({categoryName: "", documentTitle: ""})
  }

  handleInputChange = (event) =>{
    this.setState({[event.target.id]: event.target.value})
  }

  render(){
    return(
      <Fragment>
      <button class="ui button" onClick={this.handleClick}>{this.state.showForm ? "Close document form" : "Create a new document"}</button>
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

export default connect(mapStateToProps, { addCategory, addDocument, fetchDocument })(CreateDocumentForm)
