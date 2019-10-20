import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Login from './containers/Login';
import Home from './containers/Home/Home';
import { default as Route } from './ProtectedRoute';
import { connect } from 'react-redux';
import { login } from './redux/actions';
import { getUser } from './redux/selectors';
import Navbar from './components/Navbar/Navbar';
import NotFound from './containers/NotFound';

const mapStateToProps = state => {
    const user = getUser(state);
    return { user };
};

const App = ({ user, login }) => {
    if (!user.username) {
        const user = window.localStorage.getItem('user');
        if (user) login(user);
    }

    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Fragment>
                        <div style={{ marginTop: '64px' }}>
                            <Navbar></Navbar>
                            <Route exact path="/" component={Home}></Route>
                            <Route component={NotFound}></Route>
                        </div>
                    </Fragment>
                </Switch>
            </div>
        </Router>
    );
};

export default connect(
    mapStateToProps,
    { login }
)(App);
