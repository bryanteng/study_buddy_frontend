import React, { Component } from 'react';

class Notecard extends Component{
  render(){
    const deck = this.props.deck
    const divStyle={
      height: '300px',
      width: '500px'
      }
    return(
      <div className='card' >
        {deck ? deck.map(card =>
          <div className="ui small fade reveal image">
            <div class="ui yellow inverted segment visible content" style={divStyle} >
              <span className="cardSpan">{card.front}</span>
            </div>
            <div class="ui orange inverted segment hidden content" style={divStyle}>
              <span className="cardSpan">{card.back}</span>
            </div>
          </div>
        ) : null }
      </div>
    )
  }
}

export default Notecard
