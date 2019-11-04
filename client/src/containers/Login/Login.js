import React from 'react'
//import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { login } from '../../redux/actions'
import { getUser } from '../../redux/selectors'
import LoginForm from '../../components/LoginForm'
import axios from 'axios'

const Login = ({ login, user: { username }, history }) => {
    const doLogin = ({ username, password }, onError) => {
        axios
            .post('/auth', { username, password })
            .then(res => {
                login(username)
                window.localStorage.setItem('auth', res.token)
                history.push('/')
            })
            .catch(error => {
                console.log(error)
                switch (error.status) {
                    case 401: {
                        onError("Are you sure you didn't misspell something?")
                        break
                    }
                    default: {
                        onError('The service might not be available')
                        break
                    }
                }
            })
    }

    return (
        <div className="container text-center">
            <h1>LoginPage</h1>
            <LoginForm onSubmit={doLogin}></LoginForm>
        </div>
    )
}

const mapStateToProps = state => {
    const user = getUser(state)
    return { user }
}

//Login.propTypes = {};

export default connect(
    mapStateToProps,
    { login }
)(Login)
