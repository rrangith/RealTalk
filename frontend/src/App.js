import React, { Component } from 'react';
import  RealTime  from './realtime'
import  Welcome  from './welcome'
import  Summary  from './summary'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <RealTime/>
      </div>
    );
  }
}

export default App;
