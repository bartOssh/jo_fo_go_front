import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './Login.css'
import { useDispatch } from 'react-redux'
import { setAuthorized, setJWT } from '../../redux/personalActions'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppState } from '../../redux/reducers'
import { LoginAuth, SigninAuth, Auth } from '../../api'

export const Login = ({ signin }: { signin: boolean }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const isAuthorized = useSelector(
        (state: AppState) => state.personal.authorized
    )
    const auth: Auth = signin ? new SigninAuth() : new LoginAuth()

    const validateForm = () => {
        return email.length > 0 && password.length > 0
    }
    const history = useHistory()

    useEffect(() => {
        if (isAuthorized) {
            history.push('/')
        }
    }, [isAuthorized])

    const handleSubmit = async (event: any): Promise<void> => {
        event.preventDefault()
        const result = await auth.setCredentials({ email, password }).dispatch()
        if (result.success && result.jwt.length) {
            dispatch(setAuthorized(true))
            dispatch(setJWT(result.jwt))
            return
        }
        if (result.success) {
            history.push('/login')
            return
        }
        console.log('Messages not implemented -> access not allowed')
    }

    return (
        <>
            <div className='Title'>{signin ? 'SIGN IN' : 'LOG IN'}</div>
            <div className='Login'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            autoFocus
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button block type='submit' disabled={!validateForm()}>
                        {signin ? 'Sign in' : 'Log in'}
                    </Button>
                </Form>
            </div>
        </>
    )
}
