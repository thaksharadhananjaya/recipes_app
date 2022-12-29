import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/auth_actions';
import logo from '../assets/logo.png';

const Header = (props) => {
  const dispatch = useDispatch();
  const userLogout = () => {
    dispatch(logout());
  }
  const nameStyle={
    marginLeft:'8px',
    fontWeight: 'bold',
    fontSize: '1.3rem',
    color:'white',
    letterSpacing: '4px'
  };
  return (
    <Navbar collapseOnSelect expand="lg" style={{ 
      zIndex: 1, 
      backgroundImage:'linear-gradient(to right top,#fb6906,#ffc107)',
      position: 'sticky', 
      top:0,
      backgroundColor: '#ddd8d5', 
      marginBottom:'32px' }}>
      <Container fluid >
        <Link to='/' className='navbar-brand'>
          <div style={{display:'flex'}}>
            <img alt='logo' src={logo} width='32px' />
            <div style={nameStyle}>RECIPE</div>
          </div>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            <Nav.Link style={{color:'white', fontWeight:'bold'}}  onClick={userLogout}>Signout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;