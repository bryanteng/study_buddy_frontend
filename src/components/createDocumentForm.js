import React, { Component,Fragment } from 'react';

class CreateDocumentForm extends Component{

  state={
    showForm: false
  }

  handleClick = () => {
    this.setState({showForm: !this.state.showForm})
  }

  render(){
    return(
      <Fragment>
      <button class="ui button" onClick={this.handleClick}>Create a new document</button>
        {this.state.showForm ?
          <div class="ui form success">
          <div class="field">
            <label>Category</label>
            <input type="text" placeholder="Category name here..." />
            <label>Title</label>
            <input type="text" placeholder="Document title here..." />
          </div>
          <div class="ui success message">
            <div class="header">Form Completed</div>
            <p>You are all signed up for the newsletter.</p>
          </div>
          <div class="ui submit button">Submit</div>
          </div>
            :
          null
        }
        <br/>
        <br/>
      </Fragment>
    )
  }

}

export default CreateDocumentForm
