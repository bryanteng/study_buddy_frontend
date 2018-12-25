import React from 'react';
import '../styles/notecard.css'

const SubCatNotecardDisplay = ({notecard,handleNotecardDelete}) => (
  <div className='outer' >
    <div class="inner"><i class="clone icon"></i></div>
    <div class="inner"><div class="header" id={notecard.id}>{notecard.front}</div></div>
    <div class="inner"><button class="ui mini inverted icon button" id={notecard.id} onClick={handleNotecardDelete}><i id={notecard.id} class="trash icon"></i></button></div>
  </div>
);

export default SubCatNotecardDisplay
