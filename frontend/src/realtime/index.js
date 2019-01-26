import React from 'react';
import { VictoryAxis, VictoryPie, VictoryChart, VictoryArea } from 'victory';
import './index.css'

const RealTime = () => {
    const data = [
        {quarter: 1, earnings: 13000},
        {quarter: 2, earnings: 16500},
        {quarter: 3, earnings: 14250},
        {quarter: 4, earnings: 19000}
      ];
    const speedData = [
        { x: 1, y: 2},
        { x: 2, y: 3},
        { x: 3, y: 5},
        { x: 4, y: 4},
        { x: 5, y: 6}
    ]
  return (
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
            Body language

            <VictoryPie
                startAngle={90}
                endAngle={-90}
                colorScale={["url(#talk-data)"]}
                data={[1]}
            />

        </div>
        <div className="grid-item-top">WebCam footage</div>
        <div className="grid-item-top">Facial Expressions</div>
        <div className="grid-item-bottom">Filler Words</div>
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
        <div className="grid-item-bottom">Voice</div>

    </div>
  );
};

export default RealTime;