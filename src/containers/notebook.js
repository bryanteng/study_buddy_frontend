import React, { Component, Fragment } from 'react'
import Page from '../components/page'
import { connect } from 'react-redux'
import { setUserDocuments, setDocument } from '../actions/page'

class Notebook extends Component{

  handleClick = (event) => {
    console.log(event.target.id)
    this.props.setDocument(event.target.id)
  }

  componentDidMount(){
    fetch(`http://localhost:3000/users/${this.props.user_id}`)
    .then(res=> res.json())
    .then(data => this.props.setUserDocuments(data.documents))
  }
  render(){
    return(
      <Fragment>
      "Hi from NoteBook"
      {this.props.user_documents.map(document => <div onClick={this.handleClick} id={document.id}>{document.category.name}</div> )}
      <Page />
      </Fragment>
    )
  }
}

const mapStateToProps = (state) =>{
  console.log(state, "in map state");
  return{
    user_id: state.login.user_id,
    user_documents: state.page.user_documents,
    document_id: state.page.document_id
  }
}

export default connect(mapStateToProps, {setUserDocuments, setDocument})(Notebook)
