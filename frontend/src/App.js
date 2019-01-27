import React, { Component } from 'react';
import  RealTime  from './realtime'
import  Welcome  from './welcome'
import  Summary  from './summary'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <RealTime data={{score: 40, expression: "happy", filler: 300, speed: null}}/>
      </div>
    );
  }
}

export default App;