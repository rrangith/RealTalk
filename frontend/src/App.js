import React, { Component } from 'react';
import  RealTime  from './realtime'
import  Welcome  from './welcome'
import  Summary  from './summary'
import { Section } from './summary'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      {/* <Welcome></Welcome> */}
        {/* <RealTime data={{score: 40, expression: "happy", filler: 300, speed: null}}/> */}
        <Summary summaryData= {
          {
            expression:{
              happy: 20,
              surprised:30,
              neutral: 40,
              sad: 6,
              angry: 4,},
            filler: {
              like: 0,
              um:0, 
              basically: 0, 
              really:0, 
              very:0, 
              literally:0, 
              stuff:0, 
              things:0, 
              yeah:0, 
              okay:0, 
              right:0, 
              mean:0},
            talkingSpeed: {
              speed: 0,
            },
            movement:  {
              movement: 0,
            },
            overallRating: {
              overall: 0,
            }
              }}/>
      </div>
    );
  }
}

export default App;
