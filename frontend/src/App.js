import React, { Component } from "react";
import RealTime from "./realtime";
import Welcome from "./welcome";
import Summary from "./summary";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      load: ""
    };
  }
  queryData = () => {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        this.setState({
          load: xhr.responseText
        });
      }
    }.bind(this);
    xhr.open("POST", "http://localhost:5000/current", true);
    xhr.send(null);
  };
  componentDidMount() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        setInterval(this.queryData, 500);
      }
    }.bind(this);
    xhr.open("POST", "http://localhost:5000/start", true);
    xhr.send(null);
  }
  render() {
    console.log(this.state.load);
    return (
      <div className="App">
        <RealTime
          data={{ score: 40, expression: "happy", filler: 300, speed: null }}
        />
      </div>
    );
  }
}

export default App;
