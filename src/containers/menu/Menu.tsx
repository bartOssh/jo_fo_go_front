import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import './Menu.css'
import { setAuthorized } from '../../redux/personalActions'
import { useDispatch } from 'react-redux'

export const Menu = ({ isAuthorized }: { isAuthorized: boolean }) => {
    const dispatch = useDispatch()
    const logOut = () => {
        dispatch(setAuthorized(false))
    }

    return (
        <Navbar bg='dark' variant='light'>
            <Container>
                <Nav className='Menu'>
                    {isAuthorized && (
                        <Link to='/login' onClick={logOut}>
                            Logout
                        </Link>
                    )}
                    {!isAuthorized && (
                        <>
                            <Link to='/signin'>Signin</Link>
                            <Link to='/login'>Login</Link>
                        </>
                    )}
                </Nav>
                <span className='Welcome'> FOREX ORACLE </span>
            </Container>
        </Navbar>
    )
}
