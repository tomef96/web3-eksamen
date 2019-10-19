import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser } from '../../redux/selectors';

const Home = ({ user: { username }, history }) => {
    console.log(username);
    if (!username) history.push('/login');

    return (
        <div>
            <h1>Welcome {username}</h1>
        </div>
    );
};

Home.propTypes = {};

const mapStateToProps = state => {
    const user = getUser(state);
    return { user };
};

export default connect(mapStateToProps)(Home);
