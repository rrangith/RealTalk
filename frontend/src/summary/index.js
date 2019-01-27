import React from "react";
import styled from "styled-components";
import { VictoryAxis, VictoryPie, VictoryChart, VictoryArea } from "victory";

const Body = styled.header`
  background: #4ac29a;
  background: -webkit-linear-gradient(to bottom, #4ac29a, #bdfff3);
  background: linear-gradient(to bottom, #4ac29a, #bdfff3);
  height: 100%;
  width: 100%;
  font-color: white;
`;
const Title = styled.h1`
  @import url("https://fonts.googleapis.com/css?family=Raleway");
  font-family: "Raleway", sans-serif;
  color: #ffffff;
  padding-top: 50px;
  font-size: 45px;
`;
const Expression = styled.div``;
const Filler = styled.div``;
const Talking = styled.div``;
const Movement = styled.div``;
const Overall = styled.div``;

class Summary extends React.Component {
  render() {
    const expressionDataSet = [
      this.props.summaryData.expression.happy,
      this.props.summaryData.expression.surprised,
      this.props.summaryData.expression.neutral,
      this.props.summaryData.expression.sad,
      this.props.summaryData.expression.angry
    ];
    return (
      <Body>
        <Title>Summary</Title>
        <Expression>
          <VictoryPie
            padAngle={2}
            innerRadius={120}
            data={this.expressionDataSet}
            width={1500}
          />
        </Expression>
        <Filler>
          {this.props.summaryData.filler.like}
          {this.props.summaryData.filler.um}
          {this.props.summaryData.filler.basically}
          {this.props.summaryData.filler.really}
          {this.props.summaryData.filler.very}
          {this.props.summaryData.filler.literally}
          {this.props.summaryData.filler.stuff}
          {this.props.summaryData.filler.things}
          {this.props.summaryData.filler.yeah}
          {this.props.summaryData.filler.okay}
          {this.props.summaryData.filler.right}
          {this.props.summaryData.filler.mean}
        </Filler>
        <Talking>{this.props.summaryData.talkingSpeed.speed}</Talking>
        <Movement>{this.props.summaryData.movement.movement}</Movement>
        <Overall>{this.props.summaryData.overallRating.overall}</Overall>
      </Body>
    );
  }
}

export default Summary;
