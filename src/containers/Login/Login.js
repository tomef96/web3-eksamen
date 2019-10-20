import React from 'react';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../redux/actions';
import { getUser } from '../../redux/selectors';
import LoginForm from '../../components/LoginForm';

const Login = ({ login, user: { username }, history }) => {
    const doLogin = ({ username, password }, onError) => {
        console.log(`doLogin executed with u: ${username} and p: ${password}`);

        if (username !== 'Sasuke' || password !== 'storesteiner') {
            onError("Are you sure you didn't misspell something?");
        } else {
            login(username);
            window.localStorage.setItem('user', username);
            history.push('/');
        }
    };

    return (
        <div className="container text-center">
            <h1>LoginPage</h1>
            <LoginForm onSubmit={doLogin}></LoginForm>
        </div>
    );
};

const mapStateToProps = state => {
    const user = getUser(state);
    return { user };
};

//Login.propTypes = {};

export default connect(
    mapStateToProps,
    { login }
)(Login);
