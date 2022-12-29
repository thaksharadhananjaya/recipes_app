import React from 'react';
import styled from 'styled-components';

import { Button } from 'react-bootstrap';


export default function RecipeCard(props) {

  return (
    <Container key={props._id} image = {props.image}>
      <Button variant='warning' onClick={props.onClick}
        className='button'       
      >
        <div className="card">
          <div className="card-side front">
            <div className='label'>{props.name}</div>
          </div>
          <div className="card-side back">
            <div className="card-back-content">
              <div className='div-name' >{props.name}</div>
              <div className='div-description'>{props.description ? props.description.substring(0, 120) : ''}</div>
              <div className='cook-label'>Let's Cook</div>
            </div>
          </div>
        </div>
      </Button>
    </Container>
  )
}


const Container = styled.div`
*{
    padding:0;
    margin:0;
  }
  

  .card {
    position: relative;
    height: 16rem;
    max-width: 280px;
    width:280px;
    box-shadow: none;
    background: none;
    cursor:pointer;
    border: none;
    
  }
  
  .card-side {
    height: 16rem;
    border-radius: 15px;
    transition: all 0.8s ease;
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    
    width: 100%;

    color: white;
    display:flex;
    justify-content:center;
    align-items:center;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
  
  .card-side.back {
    
    transform: rotateY(-180deg);
    background-color: #4158D0;
    background-image:linear-gradient(to right top,#fb6906,#5cf705);
  }
  
  .card-side.front {
    background-color: #0093E9;
    background-size: cover;
    background-image:url('${props => props.image}');
  }
  
  .card:hover .card-side.front {
    transform: rotateY(180deg);
  }
  
  .card:hover .card-side.back {
    transform: rotateY(0deg);
  }
  .button{
    --bs-btn-hover-bg: transparent;
    background-color: transparent;
    border:none;
  }

  .label{
    position: absolute;
    display:flex;
    bottom: 0;
    width:100%;
    height:20%;
    background-color: rgba(255, 94, 37, 0.86);
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
    align-items:center;
    justify-content:center;
    font-weight: bolder;
  }

  .cook-label{
    background-color: red;
    width:150px;
    padding:0.5rem;
    color: white;
    border-radius: 8px;
    align-self: center;
    margin-bottom:16px;
    position: absolute;
    display:flex;
    bottom: 0;
    align-items:center;
    justify-content:center;
  }

  .card-back-content{
    display: flex;
    flex-direction: column;
    
    
  }
  .div-description{
    width:280px;
    font-size:0.8rem;
    word-wrap: break-word;
    padding:8px;
  }

  .div-name{
    font-size:1.4rem;
    font-weight:bold;
    position: absolute;
    display:flex;
    top: 0;
    align-self: center;
    margin-top:16px
  }
 
`


