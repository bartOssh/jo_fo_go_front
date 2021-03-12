import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Login } from './containers'
import { Menu } from './containers'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppState } from './redux/reducers'

const App = () => {
    const isAuthorized = useSelector(
        (state: AppState) => state.personal.authorized
    )

    return (
        <Router>
            <Menu isAuthorized={isAuthorized || false} />
            <Switch>
                <Route path='/login'>
                    <Login signin={false} />
                </Route>
                <Route path='/signin'>
                    <Login signin={true} />
                </Route>
                <Route path='/'>
                    {isAuthorized && 'Home'}
                    {!isAuthorized && <Redirect to='/login' />}
                </Route>
            </Switch>
        </Router>
    )
}

export default App
