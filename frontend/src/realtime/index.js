import React from 'react';
import { VictoryPie, VictoryChart, VictoryArea } from 'victory';
import Webcam from 'react-webcam';
import { ReactMic } from 'react-mic';
import { FaSmile, FaFrown, FaSurprise, FaAngry, FaMehBlank } from 'react-icons/fa';
import './index.css'
import arrow from "../images/arrow.png";



class RealTime extends React.Component {
    constructor(props) {
        super(props);
    }
    setRef = webcam => {
        this.webcam = webcam;
      };    
    capture = () => {
        const imageSrc = this.webcam.getScreenshot();
        var url = "http://localhost:5000/sendVideo";

        var json = JSON.stringify(imageSrc);
        
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
        xhr.onload = function () {
            if(xhr.readyState == 4 && xhr.status == "201") {
                console.log(xhr.responseText);
            }
        }
        xhr.send(json);
    }
    componentDidMount(){
        setInterval(this.capture, 200)
    }
    render(){
        console.log(this.props.data);
        return (
            <div id="realtime">
                <div id="grid-container">
                    <svg style={{ height: 0 }}>
                        <defs>
                            <linearGradient id="talk-data">
                                <stop offset="0%" stopColor="#BDFFF3"/>
                                <stop offset="90%" stopColor="#4AC29A"/>
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="grid-item-top">
                        Body Language <hr/>
                        <div id="body-language">
                        <span>Score: {Math.round(this.props.data.score * 100) / 100}</span>
                            <VictoryPie 
                                startAngle={-90+(180*(this.props.data.score/10))}
                                endAngle={-90}
                                animate={{duration: 500}}
                                colorScale={["url(#talk-data)"]}
                                data={[1]}
                                labels={() => null}
                            />
                        </div>
                    </div>
                    <div id="cam" className="grid-item-top">
                        <Webcam height={350} width={400} screenshotFormat="image/jpeg" ref={this.setRef}/>
                    </div>
                    <div className="grid-item-top">
                        Facial Expressions <br/>
                        {this.props.data.expression.toLowerCase() === "happy"  ?  <FaSmile className="happy"/>:""}
                        {this.props.data.expression.toLowerCase() === "surprise"  ?  <FaSurprise className="happy"/>:""}
                        {this.props.data.expression.toLowerCase() === "neutral"  ?  <FaMehBlank className="neutral"/>:""}
                        {this.props.data.expression.toLowerCase() === "sad"  ?  <FaFrown className="sad"/>:""}
                        {this.props.data.expression.toLowerCase() === "angry"  ?  <FaAngry className="sad"/>:""}
                        {this.props.data.expression.toLowerCase() === "neutral"  ?  <div className="neutralText">{this.props.data.expression}
                            </div> 
                            :
                            <span>
                                {this.props.data.expression.toLowerCase() === "happy" || this.props.data.expression.toLowerCase() === "surprise" ?
                                    <div className="happyText">{this.props.data.expression}</div>
                                :
                                    <span>
                                        {this.props.data.expression.toLowerCase() ==="angry" || this.props.data.expression.toLowerCase() ==="sad" ? <div className="sadText">{this.props.data.expression}</div>
                                        : 
                                        <span><FaMehBlank className="neutral"/><div className="neutralText">Neutral</div></span>}
                                    </span>
                                }
                            </span> 
                        }
                    </div>
                    <div className="grid-item-bottom">
                        <div id="filler">  
                            <div>{this.props.data.filler}</div>
                            Filler Words used
                        </div>
                    </div>
                    <div className="grid-item-bottom">
                        Talking speed
                        <VictoryChart>
                            <VictoryArea
                            interpolation="natural"
                            style={{
                                data: {fill: "url(#talk-data)"}
                            }}
                            data={this.props.data.speed}
                            />
                        </VictoryChart>
                    </div>
                    <div className="grid-item-bottom">
                    Voice
                        <div id="voice">
                            <ReactMic
                                id="voice"
                                record={true}
                                className="sound-wave"
                                strokeColor="#4AC29A"
                                backgroundColor="white" />
                        </div>
                    </div>
                    <img id="downarrow" onClick={this.props.callback} src={arrow}/>
                </div>
            </div>
    )};
};

export default RealTime;