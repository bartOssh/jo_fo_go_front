import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Login } from './containers'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
function App() {
    return (
        <Router>
            <Switch>
                <Route path="/login">
                    <Login signin={false} />
                </Route>
                <Route path="/signin">
                    <Login signin={true} />
                </Route>
                <Route path="/home">home</Route>
                <Route path="/">root</Route>
            </Switch>
        </Router>
    )
}

export default App
