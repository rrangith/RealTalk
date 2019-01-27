import React from "react";
import styled from "styled-components";
import { VictoryPie, VictoryChart, VictoryBar } from "victory";

const Body = styled.header`
background: #4ac29a;
background: -webkit-linear-gradient(to bottom, #4ac29a, #bdfff3);
background: linear-gradient(to bottom, #4ac29a, #bdfff3);
height: 100%;
width: 100%;
`;
const Title = styled.h1`
  @import url("https://fonts.googleapis.com/css?family=Raleway");
  font-family: "Raleway", sans-serif;
  color: #ffffff;
  padding-top: 50px;
  margin-bottom: 50px;
  font-size: 45px;
`;
const Expression = styled.div``;
const Filler = styled.div`
  width: 650px;
  height: 650px;
`;
const Talking = styled.div``;
const Movement = styled.div``;
const Overall = styled.div``;

const Table = styled.table`
  width: 90%;
  margin: auto;
`;

const Cell = styled.td`
  padding-top: -10%;
  width: 50%;
`;

const ChartHeader = styled.td`
  @import url("https://fonts.googleapis.com/css?family=Raleway");
  font-family: "Raleway", sans-serif;
  color: #4c5452;
  font-size: 28px;
  width: 300px;
  text-align: center;
`;

const Line = styled.td`
width: 30%
padding: 0px 50px;
`;

const Speed = styled.td`
@import url("https://fonts.googleapis.com/css?family=Raleway");
  font-family: "Raleway", sans-serif;
  color: #4c5452;
  font-size: 200px;
  text-align: center;
`;

const Legend = styled.p`
@import url("https://fonts.googleapis.com/css?family=Raleway");
  font-family: "Raleway", sans-serif;
  color: #4c5452;
  font-size: 20px;
height: 15px;
`;

class Summary extends React.Component {
  render() {
    return (
      <Body>
        <Title>Here's a Summary of Your Performance</Title>
        <Table>
          <tbody>
            <tr>
              <ChartHeader>Facial Expressions</ChartHeader>
              <ChartHeader>Filler Words Used</ChartHeader>
            </tr>
            <tr>
              <Line>
                <hr></hr>
              </Line>
              <Line>
                <hr></hr>
              </Line>
            </tr>
            <tr>
              <Cell>
                <Expression>
                  <VictoryPie
                    padAngle={2}
                    width={800}
                    innerRadius={120}
                    data={[
                      { x: 1, y: this.props.summaryData.expression.happy },
                      { x: 2, y: this.props.summaryData.expression.neutral },
                      { x: 3, y: this.props.summaryData.expression.surprised },
                      { x: 4, y: this.props.summaryData.expression.sad },
                      { x: 5, y: this.props.summaryData.expression.angry }
                    ]}
                    labels={d => `${d.y}%`}
                    style={{ labels: { fontSize: 20, fill: "#4c5452" } }}
                  />
                </Expression>
                <Legend>Happy: {this.props.summaryData.expression.happy}%</Legend>
                <Legend>Neutral: {this.props.summaryData.expression.neutral}%</Legend>      
                <Legend>Surprised: {this.props.summaryData.expression.surprised}%</Legend>      
                <Legend>Sad: {this.props.summaryData.expression.sad}%</Legend>      
                <Legend>Angry: {this.props.summaryData.expression.angry}%</Legend>      
      

              </Cell>

              <Cell>
                <Filler>
                  <VictoryChart domainPadding={10}>
                    <VictoryBar
                      style={{ data: { fill: "grey" } }}
                      data={[
                        { x: 1, y: this.props.summaryData.filler.like },
                        { x: 2, y: this.props.summaryData.filler.um },
                        { x: 3, y: this.props.summaryData.filler.basically },
                        { x: 4, y: this.props.summaryData.filler.really },
                        { x: 5, y: this.props.summaryData.filler.very },
                        { x: 6, y: this.props.summaryData.filler.literally },
                        { x: 7, y: this.props.summaryData.filler.stuff },
                        { x: 8, y: this.props.summaryData.filler.things },
                        { x: 9, y: this.props.summaryData.filler.yeah },
                        { x: 10, y: this.props.summaryData.filler.okay },
                        { x: 11, y: this.props.summaryData.filler.right },
                        { x: 12, y: this.props.summaryData.filler.mean }
                      ]}
                    />
                  </VictoryChart>
                </Filler>
                  

              </Cell>
            </tr>

            <tr>
              <ChartHeader>Average Talking Speed</ChartHeader>
              <ChartHeader>Average Movement</ChartHeader>
            </tr>

            <tr>
              <Line>
                <hr></hr>
              </Line>
              <Line>
                <hr></hr>
              </Line>
            </tr>
            <tr>
              <Speed>
                {this.props.summaryData.talkingSpeed.speed}
              </Speed>
              <Speed>
                {this.props.summaryData.movement.movement}
              </Speed>
            </tr>
          </tbody>
        </Table>
        {/* <OverallHeader>
          Overall Performance: 
        </OverallHeader> */}
        <Overall>{this.props.summaryData.overallRating.overall}</Overall>
      </Body>
    );
  }
}

export default Summary;
