import React, { Component } from 'react';

import Persons from '../components/Persons'
import Cockpit from '../components/Cockpit';

import classes from './App';

class App extends Component {
  state = {
    persons: [
      { id: 'jda23jk23', name: 'Matheo', age: 34 },
      { id: 'lkml34l3k', name: 'Mathias', age: 33 },
      { id: '3kllk34ml', name: 'Max', age: 35 },
    ],
    otherState: 'some other value',
    showPersons: false
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({ persons: persons });
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
    console.log(doesShow);
  };

  render() {
    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons
        persons={this.state.persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangedHandler} />;
    }

    return (
      <div className={classes.App}>
        <Cockpit
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonHandler} />
        {persons}
      </div>
    );
  }
}

export default App;
