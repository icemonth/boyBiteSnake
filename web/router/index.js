import React from 'react'
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom'
import { asyncLoad } from './asyncLoad'
const Home = asyncLoad(() => import('pages/Home'))
const Deed = asyncLoad(() => import('pages/Deed'))
const getRouter = () => (
    <Router>
        <Switch>
            <Route path="/" component={Home} exact />
            <Route path='/deed/:id' component={Deed} exact />
        </Switch>
    </Router>
)

export {
    getRouter
}