import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addCategory, addDocument } from '../actions/page'
import { fetchDocument } from '../actions/create_document_form'
import Popup from "reactjs-popup";

class CreateDocumentForm extends Component{

  state={
    categoryName: "",
    documentTitle: ""
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
        <Popup trigger={<button className="ui button"> Create Document Form </button>} modal>
          {close => (
            <div className="ui red segment">
              <div className="header"> Create Document Form </div>
              <div className="content">
                <form class="ui form" onSubmit={this.handleFormSubmit}>
                  <label>Category</label>
                  <input type="text" id="categoryName" value={this.state.categoryName} onChange={this.handleInputChange} placeholder="Category name here..." />
                  <br/>
                  <label>Title</label>
                  <input type="text" id="documentTitle" value={this.state.documentTitle} onChange={this.handleInputChange} placeholder="Document title here..." />
                  <br/><br/>
                    <button class="ui button" type="submit">Submit</button>
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
    user_id: state.login.user_id
  }
}

export default connect(mapStateToProps, { addCategory, addDocument, fetchDocument })(CreateDocumentForm)
