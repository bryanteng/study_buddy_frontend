import React, { Component } from 'react'
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
// import ImageResize from 'quill-image-resize-module';
// Quill.register('modules/imageResize', ImageResize)
import { connect } from 'react-redux'
import { setDelta } from '../actions/page'

class Page extends Component {

  handleChange = (content, delta, source, editor) => {
    if (source === "user"){
    fetch(`http://localhost:3000/documents/${this.props.document_id}`,{
      method: "PATCH",
      headers:{
            "Content-type": "application/json"
        },
        body: JSON.stringify({delta: editor.getContents().ops})
      }
    ).then(res => res.json())
    .then(data => this.props.setDelta(data.delta))
    }
  }

  componentDidMount(){
    fetch(`http://localhost:3000/documents/${this.props.document_id}`)
    .then(res=> res.json())
    .then(data => this.props.setDelta(data.delta))
  }

  componentDidUpdate(prevProps){
    if(this.props.document_id !== prevProps.document_id){
      fetch(`http://localhost:3000/documents/${this.props.document_id}`)
      .then(res=> res.json())
      .then(data => this.props.setDelta(data.delta))
    }
  }

  render(){
    return(
      <div id="editor">
        <ReactQuill
          onChange={this.handleChange}
          defaultValue="hello world"
          value={this.props.delta}
          modules={Page.modules}
          formats={Page.formats}>
       </ReactQuill>
      </div>
    )
  }

}
const mapStateToProps = (state) => {
  return {
    user_id: state.login.user_id,
    document_id: state.page.document_id,
    delta: state.page.delta
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    setDelta: (delta) =>{
      dispatch(setDelta(delta))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)

Page.modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [ 'link', 'image', 'video', 'formula' ],          // add's image support
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  //   imageDrop: true,
  // imageResize: {}
  }
}
Page.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]
