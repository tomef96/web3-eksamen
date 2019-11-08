import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { authenticate } from '../../redux/actions'
import LoginForm from '../../components/LoginForm'
import { getUser } from '../../redux/selectors'

const Login = ({ username, history, authenticate }) => {
    useEffect(() => {
        if (username) history.push('/')
    }, [username, history])

    return (
        <div className="container text-center">
            <h1>Loot Admin</h1>
            <LoginForm onSubmit={authenticate} />
        </div>
    )
}

Login.propTypes = {
    username: PropTypes.string,
    history: PropTypes.object.isRequired,
    authenticate: PropTypes.func.isRequired
}

export default connect(
    store => ({ ...getUser(store) }),
    { authenticate }
)(Login)
