import React, { Component } from 'react';

const Notecard = ({deck}) => (
  <div className='card' >
    {deck ? deck.map(card =>
      <div className="ui small fade reveal image">
        <div class="ui yellow inverted segment visible content"  >
          <span className="cardSpan">{card.front}</span>
        </div>
        <div class="ui orange inverted segment hidden content" >
          <span className="cardSpan">{card.back}</span>
        </div>
      </div>
    ) : null }
  </div>
);

export default Notecard
