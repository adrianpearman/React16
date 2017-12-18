import React from 'react'

const Cockpit = (props) => {
  return (
    <div>
      <h1>Hello, welcome to this React App</h1>
      <p className={props.classes.join(' ')}> Let see the list of people!</p>
      <button
        style={props.style}
        onClick={props.click}>
        Toggle List
      </button>

    </div>
  )
}

export default Cockpit
