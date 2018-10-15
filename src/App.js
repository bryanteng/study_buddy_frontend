import React, { Component } from 'react';
import './App.css';
import ReactQuill, {Quill} from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
// import ImageResize from 'quill-image-resize-module';
//
// Quill.register('modules/imageResize', ImageResize)



class App extends Component {

  state={
    user: 1,
    category: 1,
    document_id: 1,
    delta: ""
  }

  handleChange = (content, delta, source, editor) => {
    if (source === "user"){
    fetch(`http://localhost:3000/documents/${this.state.document_id}`,{
      method: "PATCH",
      headers:{
            "Content-type": "application/json"
        },
        body: JSON.stringify({delta: editor.getContents().ops})
      }
    ).then(res => res.json())
    .then(data => this.setState({delta: data.delta}))
    }
  }

  componentDidMount(){
    fetch(`http://localhost:3000/documents/${this.state.document_id}`)
    .then(res=> res.json())
    .then(data => this.setState({delta: data.delta}))
  }

    render() {
    return (
      <div className="App">
        <div id="editor">
          <ReactQuill theme="snow"
            onChange={this.handleChange}
            defaultValue="hello world"
            value={this.state.delta}
             modules={App.modules}
             formats={App.formats}>
         </ReactQuill>
        </div>
      </div>
    );
  }
}
export default App;

App.modules = {
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
App.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]
