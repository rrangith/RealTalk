import React from 'react';
import styled from 'styled-components';
import hand from '../images/hand.png';
import face from '../images/girlfacequestion.png';


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
`
const IconDescription = styled.p `
    @import url('https://fonts.googleapis.com/css?family=Encode+Sans');
    font-family: 'Encode Sans', sans-serif;
    color: #4c5452;
    font-size: 16px;
    width: 200px;
`

const Hand = styled.img`
margin-top: 15px;
width: 150px;
`

const FaceQuestion = styled.img `
width: 130px;
`

const Table = styled.table`
    table-layout: fixed;
    margin-top: 40px;
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
                                <td align="center">
                                <BoxMovement>
                                    <Hand src={hand}/>
                                    <IconDescription>Monitor your hand movements</IconDescription>
                                    <FaceQuestion src={face}/>
                                    <IconDescription>Observe your facial expressions</IconDescription>
                                </BoxMovement>
                                <BoxHeading>Track Movements.</BoxHeading>
                                </td>

                                <td align="center">
                                <BoxVoice>
                                    {/* image 1 */}
                                    <IconDescription>Keep count of filler words</IconDescription>
                                    {/* image 2 */}
                                    <IconDescription>Find the perfect talking speed</IconDescription>
                                    {/* image 3 */}
                                    <IconDescription>Keep track of your volume and pitch</IconDescription>
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