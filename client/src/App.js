import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import './App.css'
import Login from './containers/Login'
import Home from './containers/Home/Home'
import { default as Route } from './ProtectedRoute'
import { connect } from 'react-redux'
import { login } from './redux/actions'
import { getUser } from './redux/selectors'
import Navbar from './components/Navbar/Navbar'
import NotFound from './containers/NotFound'

const mapStateToProps = state => {
    const user = getUser(state)
    return { user }
}

const App = ({ user, login }) => {
    if (!user.username) {
        const user = window.localStorage.getItem('auth')
        if (user) login(user)
    }

    return (
        <Router>
            <Navbar />
            <div className="App" style={{ marginTop: '64px' }}>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route exact path="/" component={Home} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
    )
}

export default connect(
    mapStateToProps,
    { login }
)(App)
