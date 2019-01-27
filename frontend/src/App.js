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
              like: 2,
              um:12, 
              basically: 5, 
              really:2, 
              very:3, 
              literally:7, 
              stuff:9, 
              things:12, 
              yeah:6, 
              okay:2, 
              right:8, 
              mean:11},
            talkingSpeed: {
              speed: 60,
            },
            movement:  {
              movement: 14,
            },
            overallRating: {
              overall: 72,
            }
              }}/>
      </div>
    );
  }
}

export default App;
