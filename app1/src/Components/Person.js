import React, { Component } from 'react'
import Radium from 'radium'

class Person extends Component {
  componentDidMount(){
    if (this.props.position === 0) {
      // focuses on the input value of the first person
      this.inputFocus.focus()
    }
  }

  render(){
    const style = {
      '@media(min-width: 500px)':{
        width: '450px'
      }
    }

    return(
      <div className='Person' style={style}>
        <p onClick={this.props.click}>
          Hello! my name is {this.props.name}, and I'm {this.props.age} years old.
        </p>
        {/* <p>
          My fake age is {Math.floor(Math.random() * 35)}
        </p> */}
        <p>{this.props.children}</p>
        <input
          ref={(input) => {this.inputFocus = input}}
          type='text'
          value={this.props.name}
          onChange={this.props.changed}
          />
      </div>
    )
  }
}

export default Radium(Person)
