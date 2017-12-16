import React, { Component } from 'react';
import Radium, { StyleRoot } from 'radium'
import Person from './Components/Person'
import ErrorBoundary from './ErrorBoundary/ErrorBoundary'

class App extends Component {
  state = {
    persons: [
      {id: '1',name: 'Adrian', age: 26},
      {id: '2',name: 'Ryan', age: 27},
      {id: '3',name: 'Rubix', age: 62},
      {id: '4',name: 'Brad', age: 34}
    ],
    showPersons: false
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
    this.setState({
      showPersons: !doesShow
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
          {this.state.persons.map((person, index) => {
            return(
              // ErrorBoundary used for production instances. Development will always show a seperate error handling screen
              <ErrorBoundary key={person.id}>
                <Person
                  name={person.name}
                  age={person.age}
                  click={() => this.deletePersonHandler(index)}
                  changed={(event) => this.nameChangeHandler(event, person.id)}
                  // // option 1 for binding a props handler
                  // click={() => this.switchNameHandler('Adrian')}/>
                  // // option 2 for binding a props handler
                  // click={this.switchNameHandler.bind(this, 'ADRIAN!!')}/>
                />
              </ErrorBoundary>
            )
          })}
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
          <h1>Hello, welcome to this React App</h1>
          <p className={classes.join(' ')}> Let see the list of people!</p>
          <button
            style={style}
            onClick={this.togglePersonsHandler}>
            Toggle List
          </button>

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

export default Radium(App);
