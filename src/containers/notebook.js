import React, { Component } from 'react'
import Page from '../components/page'
import CreateDocumentForm from '../components/createDocumentForm'
import CreateNotecardForm from '../components/createNotecardForm'
import { connect } from 'react-redux'
import { setUserDocuments, setDocument, setCategories } from '../actions/page'
import { changeCategory } from '../actions/create_notecard_form'

class Notebook extends Component{

  state={
    current_doc: 0,
  }

  //change this function to toggle the list dropdown
  handleCategoryClick = (event) => {
    console.log(event.target.id)
    // this.props.setDocument(event.target.id)
    // const category_docs = this.props.user_documents.filter(document => document.category.id == event.target.id)
    // this.setState({docs: category_docs})
  }

  handleTitleClick = (event) =>{
    this.props.setDocument(event.target.id)
    this.props.changeCategory(event.target.title)
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
      <div class="ui grid">
        <div class='three wide column'>
        {this.props.user_categories.map(category =>
        <div class="ui list">
          <div class="item">
            <i class="folder icon"></i>
            <div class="content">
              <div class="header" id={category.id} onClick={this.handleCategoryClick} >{category.name} {category.id}</div>
              <div class="list">
              {this.props.user_documents.filter(document => document.category.id == category.id).map(doc =>
                <div class="item">
                  {doc.id == this.state.current_doc ? <i class="angle right icon"></i>  : <i class="file icon"></i>}
                  <div class="content">
                    <div class="header" id={doc.id} title={doc.title} onClick={this.handleTitleClick}>{doc.title} {doc.id}</div>
                  </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      )}
      </div>
      <div class='stretched twelve wide column'>
      <div class='ui segment'>
            <CreateDocumentForm />
            <CreateNotecardForm />
            <Page />
          </div>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) =>{
  return{
    user_id: state.login.user_id,
    user_documents: state.page.user_documents,
    user_categories: state.page.user_categories
  }
}

export default connect(mapStateToProps, {setUserDocuments, setDocument, setCategories, changeCategory })(Notebook)
