import React from "react";
import styled, { keyframes } from "styled-components";
import { VictoryPie, VictoryChart, VictoryBar } from "victory";
import { fadeIn } from "react-animations";

const fader = keyframes`${fadeIn}`;

const Body = styled.header`
  background: #4ac29a;
  background: -webkit-linear-gradient(to bottom, #4ac29a, #bdfff3);
  background: linear-gradient(to bottom, #4ac29a, #bdfff3);

  width: 100%;
`;
const Title = styled.h1`
  @import url("https://fonts.googleapis.com/css?family=Raleway");
  font-family: "Raleway", sans-serif;
  color: #ffffff;
  padding-top: 50px;
  margin-bottom: 50px;
  margin-top: 0px;
  font-size: 45px;
`;
const Expression = styled.div`
animation: 4s ${fader};
`;
const Filler = styled.div`
  margin-top: -120px !important;
  margin-left: 50px;
  width: 650px;
  height: 650px;
`;

const Overall = styled.div`
  @import url("https://fonts.googleapis.com/css?family=Raleway");
  font-family: "Raleway", sans-serif;
  color: #6C6E70;
  font-size: 180px;
  text-align: center;
  animation: 15s ${fader};
`;

const Circle = styled.circle`
  border: 8px solid #FFFFFF;
  opacity: 0.8;
  border-radius: 50%;
  padding: 0px 20px 10px 20px;
`;

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
weight: 4px;
`;

const Speed = styled.td`
  @import url("https://fonts.googleapis.com/css?family=Raleway");
  font-family: "Raleway", sans-serif;
  color: #808080;
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

const FillerLegend = styled.div`
  margin-top: -150px;
  margin-left: 240px;
  animation: 10s ${fader};

`;

const ExpressionLegend = styled.div`
animation: 10s ${fader};

`;

const Space = styled.div`
  height: 30px;
`;

const OverallHeader = styled.p`
  @import url("https://fonts.googleapis.com/css?family=Raleway");
  font-family: "Raleway", sans-serif;
  color: #4c5452;
  font-size: 32px;
  text-align: center;
  margin: auto;
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
                <hr />
              </Line>
              <Line>
                <hr />
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
                      { x: 1, y: Math.round(this.props.summaryData.expression.happy) },
                      { x: 2, y: Math.round(this.props.summaryData.expression.neutral) },
                      { x: 3, y: Math.round(this.props.summaryData.expression.surprise) },
                      { x: 4, y: Math.round(this.props.summaryData.expression.sad) },
                      { x: 5, y: Math.round(this.props.summaryData.expression.angry) }
                    ]}
                    labels={d => `${d.y}%`}
                    style={{ labels: { fontSize: 20, fill: "#4c5452" } }}
                    colorScale={["#BBFDF0"]}
                    />
                </Expression>
                <ExpressionLegend>
                <Legend>
                  Happy: {Math.round(this.props.summaryData.expression.happy)}%
                </Legend>
                <Legend>
                  Neutral: {Math.round(this.props.summaryData.expression.neutral)}%
                </Legend>
                <Legend>
                  Surprised: {Math.round(this.props.summaryData.expression.surprise)}%
                </Legend>
                <Legend>
                  Sad: {Math.round(this.props.summaryData.expression.sad)}%
                </Legend>
                <Legend>
                  Angry: {Math.round(this.props.summaryData.expression.angry)}%
                </Legend>
                </ExpressionLegend>
              </Cell>

              <Cell>
                <Filler>
                  <VictoryChart domainPadding={10} animate={{duration: 500}}>
                    <VictoryBar
                      style={{ data: { fill: "#BBFDF0" } }}
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
                <FillerLegend>
                  <tr>
                    <td>
                      <Legend>
                        "Like": {this.props.summaryData.filler.like}
                      </Legend>
                      <Legend>"Um": {this.props.summaryData.filler.um}</Legend>
                      <Legend>
                        "Basically": {this.props.summaryData.filler.basically}
                      </Legend>
                      <Legend>
                        "Really": {this.props.summaryData.filler.really}
                      </Legend>
                      <Legend>
                        "Very": {this.props.summaryData.filler.very}
                      </Legend>
                      <Legend>
                        "Literally": {this.props.summaryData.filler.literally}
                      </Legend>
                    </td>
                    <td>
                      <Legend>
                        "Stuff": {this.props.summaryData.filler.stuff}
                      </Legend>
                      <Legend>
                        "Things": {this.props.summaryData.filler.things}
                      </Legend>
                      <Legend>
                        "Yeah": {this.props.summaryData.filler.yeah}
                      </Legend>
                      <Legend>
                        "Okay": {this.props.summaryData.filler.okay}
                      </Legend>
                      <Legend>
                        "Right": {this.props.summaryData.filler.right}
                      </Legend>
                      <Legend>
                        "Mean": {this.props.summaryData.filler.mean}
                      </Legend>
                    </td>
                  </tr>
                </FillerLegend>
              </Cell>
            </tr>
            <Space />
            <tr>
              <ChartHeader>Average Talking Speed</ChartHeader>
              <ChartHeader>Average Movement Score</ChartHeader>
            </tr>

            <tr>
              <Line>
                <hr />
              </Line>
              <Line>
                <hr />
              </Line>
            </tr>
            <tr>
              <Speed>{Math.round(this.props.summaryData.talkingSpeed.speed)}</Speed>
              <Speed>{Math.round(this.props.summaryData.movement.movement)}</Speed>
            </tr>
            <tr>
              <td>
                <Legend>Words per Minute</Legend>
              </td>
              <td>
                <Legend>Suggested Range: 5 - 10</Legend>
              </td>
            </tr>
          </tbody>
        </Table>
        <Space />
        <OverallHeader> Overall Performance Score</OverallHeader>
        <Overall>
          <Space />
          <Circle>{Math.round(this.props.summaryData.overallRating.overall)}</Circle>
        </Overall>
        <Space />
        <Space />
        <OverallHeader>Out of a possible 100!</OverallHeader>
        <Space />
        <Space />
        <Space />
      </Body>
    );
  }
}

export default Summary;
