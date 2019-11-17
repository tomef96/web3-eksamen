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
import NotFound from './components/NotFound'
import Product from './containers/Product'
import Grid from './components/Grid/Grid'
import Row from './components/Grid/Row'
import Column from './components/Grid/Column'
import SideNav from './components/SideNav'

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
            <Grid fluid={true} className="App p-0 m-0">
                <Row>
                    <Column size={12}>
                        <Navbar />
                    </Column>
                </Row>
                <Row style={{ minHeight: '100vh' }}>
                    <Column size={12} md={2}>
                        <SideNav />
                    </Column>
                    <Column size={12} md={10}>
                        <Switch>
                            <Route path="/product/:id" component={Product} />
                            <Route path="/login" component={Login} />
                            <Route exact path="/" component={Home} />
                            <Route component={NotFound} />
                        </Switch>
                    </Column>
                </Row>
            </Grid>
        </Router>
    )
}

export default connect(
    mapStateToProps,
    { login }
)(App)
