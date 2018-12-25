import React, { Component } from 'react'
import Page from '../components/page'
import CreateDocumentForm from '../components/createDocumentForm'
import CreateNotecardForm from '../components/createNotecardForm'
import CreateGraphForm from '../components/createGraphForm'
import { connect } from 'react-redux'
import { setUserDocuments, setDelta, setDocument, setCategories, removeDocument } from '../actions/page'
import { changeCategory } from '../actions/create_notecard_form'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import { API_ROOT } from '../constants';
import PageFile from '../components/pageFile'
import '../styles/pages.css'


class Notebook extends Component{

  state={
    current_doc: 0,
    current_category: 0
  }

  handleCategoryClick = (event) => {
    let catID = event.target.id
    if (this.state.current_category === catID){
      this.setState({current_category: 0})
    }else{
    this.setState({current_category: catID})
    }
  }

  handleTitleClick = (event) =>{
    this.props.setDocument(event.target.id)
    this.props.changeCategory(event.target.title)
    this.props.setDelta(parseInt(event.target.id, 10))
    this.setState({current_doc: event.target.id})
  }

  handleDeleteClick = (event) => {
    console.log(event.target.id,'clicked doc');
    let doc_id = event.target.id
    confirmAlert({
      title: 'Click Yes to confirm',
      message: 'Are you sure you want to delete this document?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            fetch(`${API_ROOT}/documents/${doc_id}`,{
              method: "DELETE"
            }).then(res=> {
            if (res.ok) {
              this.props.removeDocument(parseInt(doc_id, 10))
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

  componentDidMount(){
    fetch(`${API_ROOT}/users/${this.props.user_id}`)
    .then(res=> res.json())
    .then(data => {
      this.props.setUserDocuments(data.documents)
      this.props.setCategories(data.uniq_categories)
    })
  }

  componentDidUpdate(prevProps){
    if(this.props.user_id !== prevProps.user_id){
      fetch(`${API_ROOT}/users/${this.props.user_id}`)
      .then(res=> res.json())
      .then(data => {
        this.props.setUserDocuments(data.documents)
        this.props.setCategories(data.uniq_categories)
      })
    }
  }

  render(){

    return(
      <div class="ui grid">
        <div class='three wide column'>
        {this.props.user_documents && this.props.user_categories ? this.props.user_categories.map(category =>
        <div class="ui list" id="list" >
          <div class="item">
            {parseInt(this.state.current_category,10) === category.id ? <i class="folder open icon"></i> : <i class="folder icon"></i> }
            <div class="content">
              <div class="header" id={category.id} onClick={this.handleCategoryClick} >{category.name}</div>
              <div class="list">
              {this.state.current_category == category.id ? this.props.user_documents.filter(document => document.category.id == category.id).map(doc =>
                <PageFile class='page' doc={doc} current_doc={this.state.current_doc} handleTitleClick={this.handleTitleClick} handleDeleteClick={this.handleDeleteClick} />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
      </div>
      <div class='stretched twelve wide column'>
      <div class='ui segment'>
            <CreateDocumentForm />
            <CreateNotecardForm />
            <CreateGraphForm />
            <br/>
            <br/>
            {this.state.current_doc ? <Page /> : null }
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

export default connect(mapStateToProps, {setUserDocuments, setDelta, setDocument, setCategories, changeCategory, removeDocument })(Notebook)
