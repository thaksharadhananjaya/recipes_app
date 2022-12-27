import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Header from '../header';
import './style.css';

export default function Layout({children}) {
  return (
    <div>
        <Header/>
        <Container fluid>
        {children}
        </Container>
        
    </div>
  )
}
