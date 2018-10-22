import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'

class Notecard extends Component{
  render(){
    const deck = this.props.deck
    const divStyle={
      height: '300px',
      width: '500px',
      verticalAlign: 'center',
      justifyContent: 'center'
    }
    return(
      <Fragment>
        {deck ? deck.map(card =>
          <div className="ui small fade reveal image" >
            <div class="ui segment visible content" style={divStyle} >
              <span >{card.front}</span>
            </div>
            <div class="ui segment hidden content" style={divStyle}>
              <span >{card.back}</span>
            </div>
          </div>

        ) : null }
      </Fragment>
    )
  }
}



export default connect(null,null)(Notecard)
