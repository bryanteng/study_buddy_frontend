import React, { Component } from 'react';
import Popup from "reactjs-popup";
import Plot from 'react-plotly.js'

class createGraphForm extends Component{

  state={
    equation: "",
    x: [],
    y: [],
    type: "",
    color: ""
  }

  handleFormSubmit = (event) =>{
    event.preventDefault()
    this.draw()
  }

  handleInputChange = (event) =>{
    this.setState({[event.target.id]: event.target.value})
  }

  draw = () =>{
    const compiled = math.compile(this.state.equation)
    const xValues = math.range(-10, 10, 0.5).toArray()
    const yValues = xValues.map(x => compiled.eval({x: x}))
    this.setState({x: xValues, y: yValues, mode: 'lines+points', marker: {color: 'red'} })
  }

  render(){
    return(
      <Popup trigger={<button className="ui button"> A button from createGraphForm </button>} modal>
        {close => (
          <div className="modal">
            <div className="header"> Create Graph Form </div>
            <div className="content">
              <form class="ui form" onSubmit={this.handleFormSubmit}>
              <label>Enter graph Equation here</label>
              <input type="text" id="equation" onChange={this.handleInputChange}/>
              <label>Enter graph type here</label>
              <input type="text" id="type" onChange={this.handleInputChange}/>
              <label>Enter color here</label>
              <input type="text" id="color" onChange={this.handleInputChange}/>
                  <button class="ui button" type="submit">Submit</button>
                  <button
                    className="ui button"
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
