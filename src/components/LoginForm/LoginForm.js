import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Toast from '../Toast/Toast';
import $ from 'jquery';
import Input from '../Input/Input';

const LoginForm = ({ onSubmit }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        onSubmit({ username, password }, onError);
    };

    const onError = error => {
        setError(error);
        $('.toast').toast('show');
    };

    return (
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <div className="form-group">
                    <div className="row my-3">
                        <div
                            className="col-12 mx-auto"
                            style={{ maxWidth: '400px' }}
                        >
                            <Input
                                required
                                autoFocus={true}
                                placeholder="Username"
                                name="username"
                                onChange={setUsername}
                            ></Input>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div
                            className="col-12 mx-auto"
                            style={{ maxWidth: '400px' }}
                        >
                            <Input
                                required
                                placeholder="Password"
                                type="password"
                                name="password"
                                onChange={setPassword}
                            ></Input>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="col">
                            <button className="btn btn-primary" type="submit">
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <Toast
                className="mx-auto"
                header="Authentication failed"
                body={error}
            ></Toast>
        </div>
    );
};

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default LoginForm;
