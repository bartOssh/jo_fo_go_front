import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import './Menu.css'

export function Menu() {
    return (
        <Navbar bg="dark" variant="light">
            <Container>
                <Nav className="Menu">
                    <Link to="/signin">Sign in</Link>
                    <Link to="/login">Log in</Link>
                </Nav>
                <span className="Welcome"> FOREX ORACLE </span>
            </Container>
        </Navbar>
    )
}
