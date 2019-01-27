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
      talkSpeedSum: 0,
      talkSpeedTotal: 0,
      querying: null,
    };
    this.RT = React.createRef();
    this.SMRY = React.createRef();
  }
  queryData = () => {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        let copySpeed = this.state.currentTalkSpeed;
        let newSum = this.state.talkSpeedSum;
        let newTotal = this.state.talkSpeedTotal;
        if(JSON.parse(xhr.responseText).data.audio.wpm_by_line[JSON.parse(xhr.responseText).data.audio.wpm_by_line.length-1] !== undefined){
          copySpeed.push({x: this.state.currentTalkSpeed.length+1, y: JSON.parse(xhr.responseText).data.audio.wpm_by_line[JSON.parse(xhr.responseText).data.audio.wpm_by_line.length-1]})
          newTotal++;
          newSum += JSON.parse(xhr.responseText).data.audio.wpm_by_line[JSON.parse(xhr.responseText).data.audio.wpm_by_line.length-1];
        }
        this.setState({
          load: JSON.parse(xhr.responseText).data,
          currentTalkSpeed: copySpeed,
          talkSpeedSum: newSum,
          talkSpeedTotal: newTotal
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
        this.setState({
          querying: setInterval(this.queryData, 500)
        })
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
        <RealTime ref={this.RT} data={{score: (this.state.load.video.displacement/(10*this.state.load.video.frames)), expression: this.state.load.video.currentEmotion, filler: this.sumCount(this.state.load.audio.counts), speed: this.state.currentTalkSpeed
        }} callback={ ()=> {scrollToComponent(this.SMRY.current, { offset: 0, align: 'top', duration: 1500, ease:'inCirc'}); clearInterval(this.state.querying)}}/>
        <Summary ref={this.SMRY} summaryData={{
            expression:{
              happy: this.state.load.video.emotions.happy,
              surprised: this.state.load.video.emotions.surprised,
              neutral: this.state.load.video.emotions.neutral,
              sad: this.state.load.video.emotions.sad,
              angry: this.state.load.video.emotions.angry
            },
            filler: {
              like: this.state.load.audio.counts.like,
              um: this.state.load.audio.counts.um, 
              basically: this.state.load.audio.counts.basically, 
              really:this.state.load.audio.counts.really, 
              very:this.state.load.audio.counts.very, 
              literally:this.state.load.audio.counts.literally, 
              stuff:this.state.load.audio.counts.stuff, 
              things:this.state.load.audio.counts.things, 
              yeah:this.state.load.audio.counts.yeah, 
              okay:this.state.load.audio.counts.okay, 
              right:this.state.load.audio.counts.right, 
              mean:this.state.load.audio.counts.mean,
            },
            talkingSpeed: {
              speed: (this.state.talkSpeedSum/this.state.talkSpeedTotal),
            },
            movement:  {
              movement: this.state.load.video.displacement,
            },
            overallRating: {
              overall: 100,
            }
              }}/>
      </div>
    );
  }
}

export default App;
