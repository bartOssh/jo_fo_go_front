import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Menu } from '../index'
import './Login.css'

export function Login({ signin }: { signin: boolean }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function validateForm() {
        return email.length > 0 && password.length > 0
    }

    function handleSubmit(event: any) {
        event.preventDefault()
    }

    return (
        <>
            <Menu />
                <div className="Title">{signin ? 'SIGN IN' : 'LOG IN'}</div>
            <div className="Login">
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            autoFocus
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button block type="submit" disabled={!validateForm()}>
                        {signin ? 'Sign in' : 'Log in'}
                    </Button>
                </Form>
            </div>
        </>
    )
}
