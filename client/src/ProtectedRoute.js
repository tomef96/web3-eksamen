import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from './redux/selectors';

const ProtectedRoute = ({ user, component: Component, ...rest }) => {
    const render = componentProps => {
        const { location } = componentProps;

        const redirect = ({ to }) => (
            <Redirect
                to={{
                    pathname: to,
                    state: { location }
                }}
            />
        );

        if (location.pathname === '/login') {
            return user.username ? (
                redirect({ to: '/' })
            ) : (
                <Component {...componentProps} />
            );
        } else {
            return user.username ? (
                <Component {...componentProps} />
            ) : (
                redirect({ to: '/login' })
            );
        }
    };

    return <Route {...rest} render={render} />;
};

ProtectedRoute.propTypes = {
    user: PropTypes.object,
    component: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
};

const mapStateToProps = state => {
    const user = getUser(state);
    return { user };
};

export default connect(mapStateToProps)(ProtectedRoute);
