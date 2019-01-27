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
      established: false,
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
  calculateScore = () => {
    let value = 100;
    let average = (this.state.talkSpeedSum/this.state.talkSpeedTotal);
    if(average>125){
      value-= 30*((average-125)/125)
    } else if(average < 85){
      value-= 30*((85-average)/85)
    }
    let score = this.state.load.video.displacement/(10*this.state.load.video.frames);
    if(score>8){
      value -=60*((score-8)/8);
    } else if(score < 5){
      value-= 60*((5-score)/5)
    }
    return value;
  }
  sumCount = (data) => {
    return (data.basically+data.like+data.literally+data.mean+data.okay+data.really+data.right+data.stuff+data.things+data.um+data.very+data.yeah);
  }
  sumExpressions = (data) => {
    return (data.happy+data.surprise+data.neutral+data.sad+data.angry);
  }
  componentDidMount() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        this.setState({
          established: true,
        })
      }
    }.bind(this);
    xhr.open("GET", "http://localhost:5000/start", true);
    xhr.send(null);
}

  render() {
    console.log(this.state.load.video.emotions);
    console.log(this.sumExpressions(this.state.load.video.emotions));
    return (
      <div className="App">
        <Welcome callback={()=> {scrollToComponent(this.RT.current, { offset: 0, align: 'top', duration: 900, ease:'inCirc'}); if(this.state.established){
          this.setState({
            querying: setInterval(this.queryData, 500)
          })
        }}}/>
        <RealTime ref={this.RT} data={{score: (this.state.load.video.displacement/(10*this.state.load.video.frames)), expression: this.state.load.video.currentEmotion, filler: this.sumCount(this.state.load.audio.counts), speed: this.state.currentTalkSpeed
        }} callback={ ()=> {scrollToComponent(this.SMRY.current, { offset: 0, align: 'top', duration: 900, ease:'inCirc'}); clearInterval(this.state.querying)}}/>
        <Summary ref={this.SMRY} summaryData={{
            expression:{
              happy: this.state.load.video.emotions.happy/this.sumExpressions(this.state.load.video.emotions)*100,
              surprise: this.state.load.video.emotions.surprise/this.sumExpressions(this.state.load.video.emotions)*100,
              neutral: this.state.load.video.emotions.neutral/this.sumExpressions(this.state.load.video.emotions)*100,
              sad: this.state.load.video.emotions.sad/this.sumExpressions(this.state.load.video.emotions)*100,
              angry: this.state.load.video.emotions.angry/this.sumExpressions(this.state.load.video.emotions)*100
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
              movement: this.state.load.video.displacement/(10*this.state.load.video.frames),
            },
            overallRating: {
              overall: this.calculateScore(),
            }
              }}/>
      </div>
    );
  }
}

export default App;
