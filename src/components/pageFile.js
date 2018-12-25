import React from 'react';
import '../styles/pages.css'

const PageFile = ({doc,current_doc,handleTitleClick,handleDeleteClick}) => (
  <div class="outer">
    <div class="inner">{doc.id == current_doc ? <i class="angle right icon"></i> : <i class="file icon"></i>}</div>
    <div class="inner"><div class="header" id={doc.id} title={doc.title} onClick={handleTitleClick}>{ doc.title.length > 15 ? doc.title.slice(0,15)+"..." : doc.title }</div></div>
    <div class="inner"><button class="ui mini inverted icon button" onClick={handleDeleteClick}><i class="trash icon" id={doc.id}></i></button></div>
  </div>
);

export default PageFile
