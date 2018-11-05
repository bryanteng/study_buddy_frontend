import React, { Component } from 'react'
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
// import ImageResize from 'quill-image-resize-module';
// Quill.register('modules/imageResize', ImageResize)
import { connect } from 'react-redux'
import { setDelta, changeDelta } from '../actions/page'

class Page extends Component {

  handleBlur = (previousRange, source, editor) => {
    if (source === "user"){
    fetch(`https://warm-wave-64099.herokuapp.com/documents/${this.props.document_id}`,{
      method: "PATCH",
      headers:{
            "Content-type": "application/json"
        },
        body: JSON.stringify({delta: editor.getContents().ops})
      }
    ).then(res=> res.json())
    .then(data => this.props.changeDelta({id: data.id, delta: data.delta}))
    }
  }

  componentDidMount(){
    fetch(`http://localhost:3000/documents/${this.props.document_id}`)
    .then(res=> res.json())
    .then(data => this.props.setDelta(data.id))
  }

  componentDidUpdate(prevProps){

    if(this.props.document_id !== prevProps.document_id){
      fetch(`http://localhost:3000/documents/${this.props.document_id}`)
      .then(res=> res.json())
      .then(data => this.props.setDelta(data.id))
    }
  }

  render(){
    return(
      <div class="container" id="editor" >
        <ReactQuill class="editor"
          theme={"snow"}
          onBlur={this.handleBlur}
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
    delta: state.page.delta,
  }
}

export default connect(mapStateToProps, { setDelta, changeDelta })(Page)

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
    [ 'link', 'image', 'video' ],          // add's image support
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  //   imageDrop: true,
  // imageResize: {}
  }
}
Page.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote','code-block',
  'list', 'bullet', 'indent', 'sub','super','rtl',
  'link', 'image', 'video', 'color','background','align','clean'
]
