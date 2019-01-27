import React from 'react';
import styled from 'styled-components';

const Body = styled.header`
  background: #4AC29A;
    background: -webkit-linear-gradient(to bottom, #4AC29A, #BDFFF3);
    background: linear-gradient(to bottom, #4AC29A, #BDFFF3);
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

class Summary extends React.Component {
  render (){
    return(
      <Body>
        <Title>Summary</Title>
        

      </Body>
    )
  }
}

export default Summary;