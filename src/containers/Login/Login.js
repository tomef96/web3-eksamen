import React from 'react';
//import PropTypes from 'prop-types';
import LoginForm from '../../components/LoginForm';

const Login = props => {
    const doLogin = ({ username, password }, onError) => {
        if (username !== 'yo' || password !== 'bro')
            onError("Are you sure you didn't misspell something?");
        console.log(`doLogin executed with u: ${username} and p: ${password}`);
    };

    return (
        <div className="container text-center">
            <h1>LoginPage</h1>
            <LoginForm onSubmit={doLogin}></LoginForm>
        </div>
    );
};

//Login.propTypes = {};

export default Login;
