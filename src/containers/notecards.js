import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'

class Notecards extends Component{

  render(){
    return(
      <Fragment>
      "this is notecards"
        {this.props.notecards ? this.props.notecards.map(card => <div>{card}</div>) : null}
      </Fragment>
    )
  }
}

const mapStateToProps = (state) =>{
  return{
    notecards: state.notecard.notecards
  }
}

export default connect(mapStateToProps, null)(Notecards)
