import React, { Component } from 'react';
import Person from './Person'

class Persons extends Component {
  render() {
    return(
      this.props.persons.map((person, index) => {
        return (
          <Person
            key={person.id}
            name={person.name}
            position = {index}
            age={person.age}
            click={() => this.props.click(index)}
            changed={(event) => this.props.changed(event, person.id)}
            // // option 1 for binding a props handler
            // click={() => this.switchNameHandler('Adrian')}/>
            // // option 2 for binding a props handler
            // click={this.switchNameHandler.bind(this, 'ADRIAN!!')}/>
          />
        )
      })
    )
  }
}

export default Persons
