import React, { Component } from 'react';
import '../styles/notecard.css'

const Notecard = ({deck}) => (
  <div className='cards' >
    {deck ? deck.map(card =>
      <div className="ui small fade reveal image">
        <div class="ui yellow inverted segment visible content" id="notecard" >
          <span className="cardSpan">{card.front}</span>
        </div>
        <div class="ui orange inverted segment hidden content" id="notecard">
          <span className="cardSpan">{card.back}</span>
        </div>
      </div>
    ) : null }
  </div>
);

export default Notecard
