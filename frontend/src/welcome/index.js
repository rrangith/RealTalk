import React from "react";
import styled, { keyframes } from "styled-components";
import hand from "../images/hand.png";
import face from "../images/girlfacequestion.png";
import speech from "../images/speech.png";
import speed from "../images/speedometer.png";
import volume from "../images/volume.png";
import { fadeIn } from "react-animations";


const fader = keyframes`${fadeIn}`;

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
  margin: 0px;
`;
const Description = styled.p`
  @import url("https://fonts.googleapis.com/css?family=Encode+Sans:400");
  font-family: "Encode Sans", sans-serif;
  width: 78%;
  margin: auto;
  text-align: center;
  color: #ffffff;
  font-size: 18px;
  padding: 10px 0px 10px 0px;
`;
const Table = styled.table`
  table-layout: fixed;
  margin-top: 10px;
  margin-left: 10px;
  width: 99%;
`;

const Cell = styled.td`
vertical-align: top;
padding: 20px 30px 30px 30px;
`
const BoxMovement = styled.div`
  border-radius: 15px;
  border: 3px solid #4ac29a;
  height: 450px;
  width: 96%;
  background: rgb(255, 255, 255, 0.3);
`;
const BoxVoice = styled.div`
  border-radius: 15px;
  border: 3px solid #4ac29a;
  height: 450px;
  width: 96%;
  background: rgb(255, 255, 255, 0.3);
`;
const BoxHeading = styled.p`
@import url("https://fonts.googleapis.com/css?family=Raleway");
font-family: "Raleway", sans-serif;
  color: #4c5452;
  font-size: 28px;
  width: 300px;
  margin: 20px auto -10px auto;
  text-align: center;
`;
const Hand = styled.img`
  width: 140px;
  animation: 3s ${fader};
  margin-top: 15px;


`;
const IconDescriptionHand = styled.p`
  @import url("https://fonts.googleapis.com/css?family=Encode+Sans");
  font-family: "Encode Sans", sans-serif;
  color: #4c5452;
  font-size: 22px;
  width: 100%;
  animation: 3s ${fader};
  margin-top: 60px;

`;

const FaceQuestion = styled.img`
  width: 120px;
  animation: 6s ${fader};
  margin-top: 15px;


`;
const IconDescriptionFace = styled.p`
  @import url("https://fonts.googleapis.com/css?family=Encode+Sans");
  font-family: "Encode Sans", sans-serif;
  color: #4c5452;
  font-size: 22px;
  width: 100%;
  animation: 6s ${fader};
  margin-top: 60px;


`;

const Speech = styled.img`
  width: 120px;
  animation: 3s ${fader};

`;
const IconDescriptionSpeech = styled.p`
  @import url("https://fonts.googleapis.com/css?family=Encode+Sans");
  font-family: "Encode Sans", sans-serif;
  color: #4c5452;
  font-size: 22px;
  width: 100%;
  animation: 3s ${fader};
  margin-top: 30px;


`;
const Speed = styled.img`
  width: 100px;
  animation: 6s ${fader};

`;
const IconDescriptionSpeed = styled.p`
  @import url("https://fonts.googleapis.com/css?family=Encode+Sans");
  font-family: "Encode Sans", sans-serif;
  color: #4c5452;
  font-size: 22px;
  width: 100%;
  animation: 6s ${fader};
  margin-top: 30px;


`;
const Volume = styled.img`
  width: 100px;
  animation: 9s ${fader};

`;
const IconDescriptionVolume = styled.p`
  @import url("https://fonts.googleapis.com/css?family=Encode+Sans");
  font-family: "Encode Sans", sans-serif;
  color: #4c5452;
  font-size: 22px;
  width: 100%;
  animation: 9s ${fader};
  margin-top: 30px;


`;

const Button = styled.button`
  @import url("https://fonts.googleapis.com/css?family=Raleway");
  font-family: "Raleway", sans-serif;
  font-size: 25px;
  padding: 15px;
  border-radius: 15px;
  border: 1px solid #4ac29a;
  background-color: white;
  color: #4ac29a;
`;

class Welcome extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Body>
           <linearGradient id="talk-data">
            <stop offset="0%" stopColor="#BDFFF3"/>
            <stop offset="90%" stopColor="#4AC29A"/>
            </linearGradient>
        <div className="Header">
          <Title>Hello. Welcome to Stage Fight.</Title>
          <Description>
            Stage Fight is designed to help you do better. By monitoring your
            movements, voice, and providing real-time feedback, this application
            helps you improve your presentation and communication skills.
          </Description>
          <Description>
            Designed to be a versatile learning tool, Stage Fight is the ideal
            app to help you achieve your goals, whatever they may be.
          </Description>
        </div>

        <div>
          <Table>
            <tbody>
              <tr>
                <Cell>
                  <BoxMovement>
                    <tr>
                      <Cell>
                        <Hand src={hand} />
                      </Cell>
                      <Cell>
                        <IconDescriptionHand>
                          Monitor hand movements
                        </IconDescriptionHand>
                      </Cell>
                    </tr>

                    <tr>
                      <Cell>
                        <FaceQuestion src={face} />
                      </Cell>
                      <Cell>
                        <IconDescriptionFace>
                          Watch facial expressions
                        </IconDescriptionFace>
                      </Cell>
                    </tr>
                  </BoxMovement>
                  <BoxHeading>Track Movements.</BoxHeading>
                </Cell>

                <Cell>
                  <BoxVoice>
                    <tr>
                      <Cell>
                        <Speech src={speech} />
                      </Cell>
                      <Cell>
                        <IconDescriptionSpeech>
                          Count filler words
                        </IconDescriptionSpeech>
                      </Cell>
                    </tr>
                    <tr>
                      <Cell>
                        <Speed src={speed} />
                      </Cell>
                      <Cell>
                        <IconDescriptionSpeed>
                          Find your talking speed
                        </IconDescriptionSpeed>
                      </Cell>
                    </tr>
                    <tr>
                      <Cell>
                        <Volume src={volume} />
                      </Cell>
                      <Cell>
                        <IconDescriptionVolume>
                          Track your pitch and volume
                        </IconDescriptionVolume>
                      </Cell>
                    </tr>
                  </BoxVoice>
                  <BoxHeading>Track Vocals.</BoxHeading>
                </Cell>
              </tr>
            </tbody>
          </Table>
          <Button onClick={this.props.callback}>Let's get started.</Button>
        </div>
      </Body>
    );
  }
}

export default Welcome;
