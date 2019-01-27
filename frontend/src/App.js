import React, { Component } from 'react';
import scrollToComponent from 'react-scroll-to-component';
import  RealTime  from './realtime'
import  Welcome  from './welcome'
import  Summary  from './summary'
import { Section } from './summary'

import "./App.css";

class App extends Component {
    constructor(props) {
    super(props);
    this.state = {
      load: {"audio":{"counts":{"basically":0,"like":0,"literally":0,"mean":0,"okay":0,"really":0,"right":0,"stuff":0,"things":0,"um":0,"very":0,"yeah":0},"crutch_count_by_line":[0],"wpm_by_line":[0]},"video":{"currentEmotion":"surprised","displacement":0,"emotions":{"angry":0,"fear":0,"happy":0,"neutral":0},"frames":0}},
      currentTalkSpeed:[],
    };
    this.RT = React.createRef();
  }
  queryData = () => {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        let copySpeed = this.state.currentTalkSpeed;
        copySpeed.push({x: this.state.currentTalkSpeed.length+1, y: JSON.parse(xhr.responseText).data.audio.wpm_by_line[0]})
        console.log(copySpeed);
        this.setState({
          load: JSON.parse(xhr.responseText).data,
          currentTalkSpeed: copySpeed
        });
      }
    }.bind(this);
    xhr.open("GET", "http://localhost:5000/current", true);
    xhr.send(null);
  };
  sumCount = (data) => {
    console.log(data);
    return (data.basically+data.like+data.literally+data.mean+data.okay+data.really+data.right+data.stuff+data.things+data.um+data.very+data.yeah);
  }
  componentDidMount() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        setInterval(this.queryData, 500);
      }
    }.bind(this);
    xhr.open("GET", "http://localhost:5000/start", true);
    xhr.send(null);
}

  render() {
    console.log("filler words count");
    return (
      <div className="App">
        <Welcome callback={()=> {scrollToComponent(this.RT.current, { offset: 0, align: 'top', duration: 1500, ease:'inCirc'})}}/>
        <RealTime ref={this.RT} data={{score: (this.state.load.video.displacement/(10*this.state.load.video.frames)), expression: this.state.load.video.currentEmotion, filler: this.sumCount(this.state.load.audio.counts), speed: this.state.currentTalkSpeed}}/>
        {/* <Summary summaryData= {
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
              }}/> */}
      </div>
    );
  }
}

export default App;
