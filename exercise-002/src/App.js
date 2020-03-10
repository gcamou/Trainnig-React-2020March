import React, { Component } from 'react';
import './App.css';
import Validator from './Components/Validator';
import Chart from './Components/Chart';

class App extends Component {
  state = {
    userName: ''
  }

  deleteChartHandler = (index) => {
    const text = this.state.userName.split('');
    text.splice(index, 1);
    const updateText = text.join('');
    this.setState({userName: updateText});
  }

  inputChangeHandler = (event) => {
    this.setState({ userName: event.target.value });
  }

  render() {

    const chartList = this.state.userName.split('').map( (ch, index) => {
      return <Chart 
      character={ch} 
      key={index} 
      clicked={() => this.deleteChartHandler(index)}
      />
    });


    return (
      <div className="App">
        <input type="text"
          onChange={this.inputChangeHandler}
          value={this.state.userName}
        />
        <p>User Name: {this.state.userName}</p>
        <Validator longString={this.state.userName.length} />
        {chartList}
      </div>
    );
  }
}

export default App;
