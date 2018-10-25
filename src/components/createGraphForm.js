import React, { Component } from 'react';
import Popup from "reactjs-popup";
import Plot from 'react-plotly.js'

class createGraphForm extends Component{

  state={
    equation: "",
    x: [],
    y: [],
    type: "",
    color: "",
    x_lowerbound: 0,
    x_upperbound: 0,
    increment: 0
  }

  handleFormSubmit = (event) =>{
    event.preventDefault()
    this.draw()
  }

  handleInputChange = (event) =>{
    this.setState({[event.target.id]: event.target.value})
  }

  draw = () =>{
    // catch errors
    const compiled = math.compile(this.state.equation)
    const xValues = math.range(this.state.x_lowerbound, this.state.x_upperbound, this.state.increment).toArray()
    const yValues = xValues.map(x => compiled.eval({x: x}))
    this.setState({x: xValues, y: yValues, mode: 'lines+points', marker: {color: 'red'} })
  }

  handleTypeClick =(event) =>{
    this.setState({type:event.target.id })
  }

  render(){
    return(
      <Popup trigger={<button className="ui button"> Create Graph Form </button>} modal>
        {close => (
          <div className="ui red segment">
            <div className="header"> Create Graph Form </div>
            <div className="content">
              <form class="ui form" onSubmit={this.handleFormSubmit}>
              <label>Enter Equation here</label>
              <input type="text" id="equation" onChange={this.handleInputChange}/>

                <label>Enter lowerbound X here</label>
                <input type="text" id="x_lowerbound" onChange={this.handleInputChange}/>

                <label>Enter upperbound X here</label>
                <input type="text" id="x_upperbound" onChange={this.handleInputChange}/>

                <label>Enter increment by here</label>
                <input type="text" id="increment" onChange={this.handleInputChange}/>

                <div class="ui compact menu">
                <div class="ui simple dropdown item">
                  {this.state.type ? this.state.type : "Pick a chart type" }
                  <i class="dropdown icon"></i>
                  <div class="menu" >
                    <div class="item" id="scatter" onClick={this.handleTypeClick}>scatter</div>
                    <div class="item" id="bar" onClick={this.handleTypeClick} >bar</div>
                  </div>
                </div>
              </div>
              <br/>

              <label>Enter color here</label>
              <input type="text" id="color" onChange={this.handleInputChange}/>
              <br/>
              <br/>
                  <button class="ui positive basic button" type="submit">Submit</button>
                  <button
                    className="ui negative basic button"
                    onClick={() => {
                      console.log('modal closed ')
                      close()
                    }}
                  >
                    cancel
                  </button>
              </form>
              <Plot data={[
                    {
                      x: this.state.x,
                      y: this.state.y,
                      type: this.state.type,
                      mode: 'lines+points',
                      marker: {color: this.state.color},
                    }
                  ]}/>
            </div>
          </div>
        )}
      </Popup>
    )
  }
}
const math = require('mathjs')

export default createGraphForm
