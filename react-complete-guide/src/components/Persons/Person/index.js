import React, { Component } from 'react';
import classes from './Person.css';
import Aux from '../../../hoc/Aux'
import withClass from '../../../hoc/withClass';

class Person extends Component {
    render() {
        console.log('[Person.js] rendering...');
        return (
            <Aux>
                <h1>Card...</h1>
                <p onClick={this.props.click}>I'm {this.props.name} and I my age is: {this.props.age}</p>
                <p>{this.props.children}</p>
                <input type="text" onChange={this.props.changed} value={this.props.name} />
            </Aux>
        );
    }
};

export default withClass(Person, classes.Person);