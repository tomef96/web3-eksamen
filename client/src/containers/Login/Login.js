import React from 'react'
//import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { login } from '../../redux/actions'
import { getUser } from '../../redux/selectors'
import LoginForm from '../../components/LoginForm'
import axios from 'axios'

const Login = ({ login, history }) => {
    const doLogin = ({ username, passphrase }, onError) => {
        axios
            .post('/auth', { username, passphrase })
            .then(res => {
                login(username)
                // Set token in localstorage to stay logged in on refresh.
                window.localStorage.setItem('auth', res.data.token)
                history.push('/')
            })
            .catch(error => {
                console.log(error.response)
                switch (error.response.status) {
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
            <h1>Loot Admin</h1>
            <LoginForm onSubmit={doLogin} />
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
