import React from 'react';
import styled from 'styled-components';
import hand from '../images/hand.png';
import face from '../images/girlfacequestion.png';
import speech from '../images/speech.png';
import speed from '../images/speedometer.png';
import volume from '../images/volume.png';


const Body = styled.header `
    background: #4AC29A;
    background: -webkit-linear-gradient(to bottom, #4AC29A, #BDFFF3);
    background: linear-gradient(to bottom, #4AC29A, #BDFFF3); 
    margin-top: -30px;
    height: 100%;
    width: 100%;
    font-color: white;
`
const Title = styled.h1 `
    @import url('https://fonts.googleapis.com/css?family=Raleway');
    font-family: 'Raleway', sans-serif;
    color: #FFFFFF;
    padding-top: 50px;
    font-size: 45px;
`
const Description = styled.p`
    @import url('https://fonts.googleapis.com/css?family=Encode+Sans:400');
    font-family: 'Encode Sans', sans-serif;
    width: 78%;
    margin: auto;
    text-align: center;
    color: #FFFFFF;
    font-size: 18px;
    padding: 10px 0px 10px 0px;

`
const BoxMovement = styled.div`
    border-radius: 15px;
    border: 3px solid #4AC29A;
    height: 450px;
    width: 96%;

`
const BoxVoice = styled.div`
    border-radius: 15px;
    border: 3px solid #4AC29A;
    height: 450px;
    width: 96%;
`
const Button = styled.button `
    @import url('https://fonts.googleapis.com/css?family=Raleway');
    font-family: 'Raleway', sans-serif;
    font-size: 25px;
    padding: 15px;
    margin: 15px;
    border-radius: 15px;
    border: 1px solid #4AC29A;
    color: #4AC29A;
`
const BoxHeading = styled.p `
    @import url('https://fonts.googleapis.com/css?family=Encode+Sans');
    font-family: 'Encode Sans', sans-serif;
    color: #4c5452;
    font-size: 24px;
    width: 200px;
    margin-left: 200px;
`
const Hand = styled.img`
width: 150px;
`
const IconDescriptionHand = styled.p `
    @import url('https://fonts.googleapis.com/css?family=Encode+Sans');
    font-family: 'Encode Sans', sans-serif;
    color: #4c5452;
    font-size: 22px;
    width: 200px;
`

const FaceQuestion = styled.img `
width: 160px;
`
const IconDescriptionFace = styled.p `
    @import url('https://fonts.googleapis.com/css?family=Encode+Sans');
    font-family: 'Encode Sans', sans-serif;
    color: #4c5452;
    font-size: 22px;
    width: 200px;
`

const Speech = styled.img`
width: 100px;
`
const IconDescriptionSpeech = styled.p `
    @import url('https://fonts.googleapis.com/css?family=Encode+Sans');
    font-family: 'Encode Sans', sans-serif;
    color: #4c5452;
    font-size: 22px;
    width: 200px;
`
const Speed = styled.img`
width: 100px;
`
const IconDescriptionSpeed = styled.p `
    @import url('https://fonts.googleapis.com/css?family=Encode+Sans');
    font-family: 'Encode Sans', sans-serif;
    color: #4c5452;
    font-size: 22px;
    width: 200px;
`
const Volume = styled.img`
width: 100px;
`
const IconDescriptionVolume = styled.p `
    @import url('https://fonts.googleapis.com/css?family=Encode+Sans');
    font-family: 'Encode Sans', sans-serif;
    color: #4c5452;
    font-size: 22px;
    width: 200px;
`
const Table = styled.table`
    table-layout: fixed;
    margin-top: 40px;
    margin-left: 10px;
    width: 100%;
     
`

class Welcome extends React.Component {
    render (){
        return(
            <Body>
                <div className="Header">
                    <Title>Hello. Welcome to Stage Fight.</Title>
                    <Description>Stage Fight is designed to help you do better. By monitoring your movements, voice, and  providing real-time feedback, this application helps you improve your presentation and communication skills.</Description>
                    <Description>Designed to be a versatile learning tool, Stage Fight is the ideal app to help you achieve your goals, whatever they may be.</Description>
                </div>

                <div>
                    <Table>
                        <tbody>
                            <tr>
                                <td>
                                <BoxMovement>
                                    <tr>
                                        <td>
                                            <Hand src={hand}/>
                                        </td>
                                        <td>
                                            <IconDescriptionHand>Monitor your hand movements</IconDescriptionHand>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                    <FaceQuestion src={face}/>
                                    </td>
                                    <td>
                                    <IconDescriptionFace>Observe your facial expressions</IconDescriptionFace>
                                    </td>
                                    </tr>
                                </BoxMovement>
                                <BoxHeading>Track Movements.</BoxHeading>
                                </td>

                                <td>
                                <BoxVoice>
                                    <tr>
                                        <td>
                                    <Speech src={speech}/>
                                    </td>
                                    <td>
                                    <IconDescriptionSpeech>Count your use of filler words</IconDescriptionSpeech>
                                    </td>
                                    </tr>
                                    <tr>
                                        <td>
                                    <Speed src={speed}/>
                                    </td>
                                    <td>
                                    <IconDescriptionSpeed>Find the perfect talking speed</IconDescriptionSpeed>
                                    </td>
                                    </tr>
                                    <tr>
                                        <td>
                                    <Volume src={volume}/>
                                    </td>
                                    <td>
                                    <IconDescriptionVolume>Keep track of your pitch and volume</IconDescriptionVolume>
                                    </td>
                                    </tr>
                                </BoxVoice>
                                <BoxHeading>Track Vocals.</BoxHeading>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <Button>Let's get started.</Button>

                </div>
            </Body>
        )
    }
}

// movements - hand gestures and facial experessions [box for this]
// voice - filler words, talking speed, and volume [box for this]


export default Welcome; 