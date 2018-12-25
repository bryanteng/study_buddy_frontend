import React from 'react';
import SubCatNotecardDisplay from './subCatNotecardDisplay'
import '../styles/notecard.css'

const SubCatDisplay = ({currentSubcategory, subcategory, handleSubcategoryClick, notecard,handleNotecardDelete, noteCards}) => (
  <div class="item">
  {currentSubcategory === subcategory ? <i class="folder open icon"></i> : <i class="folder icon"></i>}
  <div class="content">
    <div class="header" onClick={handleSubcategoryClick} id={subcategory} >{subcategory} </div>
    <div class="list">
    {currentSubcategory === subcategory ? noteCards.filter(notecard => notecard.subcategory.name === subcategory).map(notecard =>
      <SubCatNotecardDisplay notecard={notecard} handleNotecardDelete={handleNotecardDelete} />
      ) : null }
      </div>
    </div>
  </div>
);

export default SubCatDisplay
