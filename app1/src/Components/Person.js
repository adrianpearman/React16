import React, { Component } from 'react'
import Radium from 'radium'

// const person = (props) => {
//   const style = {
//     '@media(min-width: 500px)':{
//       width: '450px'
//     }
//   }
//
//   return(
//     <div className='Person' style={style}>
//       <p onClick={props.click}>
//         Hello! my name is {props.name}, and I'm {props.age} years old.
//       </p>
//       {/* <p>
//         My fake age is {Math.floor(Math.random() * 35)}
//       </p> */}
//       <p>{props.children}</p>
//       <input
//         type='text'
//         value={props.name}
//         onChange={props.changed}
//         />
//     </div>
//   )
// }

class Person extends Component {
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
          type='text'
          value={this.props.name}
          onChange={this.props.changed}
          />
      </div>
    )
  }
}

export default Radium(Person)
