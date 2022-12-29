import React from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import logo from '../../assets/logo.png';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export default function LoginLayout(props) {
    return (
        <div>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <Card className="px-4">
                            <Card.Body>
                                <div className="mb-3 mt-md-4" >
                                    <LogoContainer>
                                        <LogoImage image={logo} />
                                        <h2>RECIPE</h2>
                                    </LogoContainer>


                                    <div className="mb-3">
                                        <Form onSubmit={props.onSubmit}>
                                            {props.children}
                                            <div className="d-grid">
                                                <Button variant="warning" type="submit">
                                                    {props.signup ? 'Create Account': 'Sign In'}
                                                </Button>
                                            </div>
                                        </Form>
                                        <div className="mt-3">
                                            <p className="mb-0  text-center">
                                                {props.signup ? 
                                                'Already have an account? ' : 
                                                "Don't have an account? "}
                                                <NavLink to={props.signup ? '/signin': '/signup'} style={{color:'orange', fontWeight:'bold'}}>
                                                    {props.signup ? 'Sign In' : 'Sign Up'}
                                                </NavLink>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

const LogoImage = styled.div`
    height:36px;
    width:36px;
    background-size: cover;
    margin-right: 16px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 30px;
    background-image:url('${props => props.image}')
`;

const LogoContainer = styled.div`
    display:flex;
    justify-content:center;
    margin-bottom:12px;

`;

