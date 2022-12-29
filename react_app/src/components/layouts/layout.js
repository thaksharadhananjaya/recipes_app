import React from 'react';
import { Container } from 'react-bootstrap';

import Header from '../header';


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
