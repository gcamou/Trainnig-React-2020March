import React, { Component } from 'react';

import Persons from '../components/Persons'
import Cockpit from '../components/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Aux';

import AuthContext from '../context/auth-context';

import classes from './App.css';
import aux from '../hoc/Aux';

class App extends Component {
  state = {
    persons: [
      { id: 'jda23jk23', name: 'Matheo', age: 34 },
      { id: 'lkml34l3k', name: 'Mathias', age: 33 },
      { id: '3kllk34ml', name: 'Max', age: 35 },
    ],
    otherState: 'some other value',
    showPersons: false,
    authenticated: false
  };

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps');
    return state;
  }

  componentWillMount() {
    console.log('[App.js] componentWillMount');
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

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

  loginHandler = () => {
    this.setState({ authenticated: true });
  }

  render() {
    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons
        persons={this.state.persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangedHandler}
        authenticated={this.state.authenticated} />;
    }

    return (
      <Aux>
        <AuthContext.Provider value={{
          authenticated: this.state.authenticated,
          login: this.loginHandler
        }}>
          <Cockpit
            showPersons={this.state.showPersons}
            persons={this.state.persons}
            clicked={this.togglePersonHandler} />
          {persons}
        </AuthContext.Provider >
      </Aux >

    );
  }
}

export default withClass(App, classes.App);
