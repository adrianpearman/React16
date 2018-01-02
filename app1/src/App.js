import React, { Component } from 'react';
import Radium, { StyleRoot } from 'radium'
import PropTypes from 'prop-types'
import Person from './Components/Person'
import ErrorBoundary from './Components/ErrorBoundary'
import Persons from './Components/Persons'
import Cockpit from './Components/Cockpit'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      persons: [
        {id: '1',name: 'Adrian', age: 26},
        {id: '2',name: 'Ryan', age: 27},
        {id: '3',name: 'Rubix', age: 62},
        {id: '4',name: 'Brad', age: 34}
      ],
      showPersons: false,
      toggleClicked: 0
    }
  }

  switchNameHandler = (newName) => {
    console.log('was clicked');
    // This will re render the name to a different name
    this.setState({
      persons: [
        {name: newName, age: 26},
        {name: 'Bacon', age: 27},
        {name: 'Rubix', age: 62},
        {name: 'Mouse', age: 34}
      ]
    })
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(person => {
      return person.id === id
    })

    const person = {...this.state.persons[personIndex]}
    person.name = event.target.value;
    const persons = [...this.state.persons]
    persons[personIndex] = person

    this.setState({
      persons: persons
    })
  }

  // uses state to change the view of the PersonsList
  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    // the better approach for manipulating state where its placed with a prevState function call.
    this.setState((prevState, props) => {
      return {
	       showPersons: !doesShow,
         toggleClicked: this.state.toggleClicked + 1
       }
    })
  }

  deletePersonHandler = (personIndex) => {
    const persons = this.state.persons.slice();
    // ES6 Version
    // const persons = [...this.state.persons]
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  }


  render() {
    // inline styling as alternative to standard css styling
    const style ={
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      // an example of radium
      ':hover' : {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    }

    let classes = []
    if (this.state.persons.length <= 2) {
      classes.push('red')
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold')
    }

    let counterClass = []
    if (this.state.persons.length <= 2) {
      counterClass.push('red')
    }
    if (this.state.persons.length <= 1) {
      counterClass.push('bold')
    }

    // Option 1 for conditional content - the recommended method. Having the function outside of the return function
    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div>
          {/* ErrorBoundary used for production instances. Development will always show a seperate error handling screen */}
          <ErrorBoundary key={this.state.persons.id}>
            <Persons
              persons={this.state.persons}
              click={this.deletePersonHandler}
              changed={this.nameChangeHandler}/>
          </ErrorBoundary>
        </div>
      );
      style.backgroundColor = 'red'
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }
    }

    let personsCount = null;
    if (this.state.showPersons) {
      personsCount = (
        <div>
          <p>There are currently <span className={counterClass.join(' ')}>{this.state.persons.length}</span> people in the list</p>
        </div>
      )
    }

    return (
      // when media queries are added through Radium. The StyleRoot Component should be used around the application.
      <StyleRoot>
        <div className="App">
          <Cockpit
            style = {style}
            classes = {classes}
            click = {this.togglePersonsHandler}
          />
          {personsCount}
          {/* Option 2 for conditional content - utilizing a toggle switch w/ a ternary operator inside of the return function
          {
            this.state.showPersons === true ?
            // Place the list of Person components here
            : null
          } */}
          {persons}
        </div>
      </StyleRoot>
    );
  }
}

// The PropTypes function is used to validate the type of prop value to insure the component works properly
Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
}
export default Radium(App);
