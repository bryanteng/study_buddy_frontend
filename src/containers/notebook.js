import React, { Component, Fragment } from 'react'
import Page from '../components/page'
import { connect } from 'react-redux'
import { setUserDocuments, setDocument, setCategories } from '../actions/page'

class Notebook extends Component{

  state={
    current_doc: 0
  }

  //change this function to toggle the list dropdown
  handleCategoryClick = (event) => {
    console.log(event.target.id)
    // this.props.setDocument(event.target.id)
    // const category_docs = this.props.user_documents.filter(document => document.category.id == event.target.id)
    // this.setState({docs: category_docs})
  }

  handleTitleClick = (event) =>{
    console.log(event.target.id, "clicked doc")
    this.props.setDocument(event.target.id)
    this.setState({current_doc: event.target.id})
  }

  componentDidMount(){
    fetch(`http://localhost:3000/users/${this.props.user_id}`)
    .then(res=> res.json())
    .then(data => {
      this.props.setUserDocuments(data.documents)
      this.props.setCategories(data.uniq_categories)
    })
  }

  render(){
    return(
      <Fragment>
        {this.props.user_categories.map(category =>
        <div class="ui list">
          <div class="item">
            <i class="folder icon"></i>
            <div class="content">
              <div class="header" id={category.id} onClick={this.handleCategoryClick} >{category.name}</div>
              <div class="list">
              {this.props.user_documents.filter(document => document.category.id == category.id).map(doc =>
                <div class="item">
                  {doc.id == this.state.current_doc ? <i class="angle right icon"></i>  : <i class="file icon"></i>}
                  <div class="content">
                    <div class="header" id={doc.id} onClick={this.handleTitleClick}>{doc.title}</div>
                  </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
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
    user_categories: state.page.user_categories
  }
}

export default connect(mapStateToProps, {setUserDocuments, setDocument, setCategories})(Notebook)
