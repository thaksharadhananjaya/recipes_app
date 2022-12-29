import React from 'react';
import styled from 'styled-components';
import pageNotImage from '../../assets/404.jpg'

export default function PageNotFound() {
  return (
    <center><Container image={pageNotImage}>
        
    </Container></center>
    
  )
}

const Container = styled.div`
background-repeat: no-repeat;
height:500px;
width:700px;
background-position: center;
background-size: cover;
background-image:url('${props => props.image}');
`;
