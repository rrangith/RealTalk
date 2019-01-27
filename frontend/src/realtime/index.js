import React from 'react';
import { VictoryAxis, VictoryPie, VictoryChart, VictoryArea } from 'victory';
import './index.css'
import Webcam from 'react-webcam';
import { ReactMic } from 'react-mic';


const RealTime = (props) => {
    console.log(props.data);
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
                    <span>Score: {props.data.score}</span>
                        <VictoryPie 
                            startAngle={-90+(180*(props.data.score/50))}
                            endAngle={-90}
                            colorScale={["url(#talk-data)"]}
                            data={[1]}
                            labels={() => null}
                        />
                    </div>
                </div>
                <div id="cam" className="grid-item-top"><Webcam height={350} width={400}/></div>
                <div className="grid-item-top">Facial Expressions</div>
                <div className="grid-item-bottom">
                    <div id="filler">  
                        <div>{props.data.filler}</div>
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
                        data={[
                            { x: 1, y: 2 },
                            { x: 2, y: 3 },
                            { x: 3, y: 7 },
                            { x: 4, y: 4 },
                            { x: 5, y: 5 }
                        ]}
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
            </div>
        </div>
    );
};

export default RealTime;