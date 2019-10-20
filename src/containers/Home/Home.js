import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser } from '../../redux/selectors';

const mapStateToProps = state => {
    const user = getUser(state);
    return { user };
};

const Home = ({ user: { username } }) => {
    return (
        <div className="container">
            <h1>Welcome {username}</h1>
            <h1>Welcome {username}</h1>
            <h1>Welcome {username}</h1>
            <h1>Welcome {username}</h1>
            <h1>Welcome {username}</h1>
            <h1>Welcome {username}</h1>
            <h1>Welcome {username}</h1>
            <h1>Welcome {username}</h1>
            <h1>Welcome {username}</h1>
            <h1>Welcome {username}</h1>
            <h1>Welcome {username}</h1>
            <h1>Welcome {username}</h1>
            <h1>Welcome {username}</h1>
            <h1>Welcome {username}</h1>
            <h1>Welcome {username}</h1>
            <h1>Welcome {username}</h1>
            <h1>Welcome {username}</h1>
            <h1>Welcome {username}</h1>
            <h1>Welcome {username}</h1>
            <h1>Welcome {username}</h1>
            <h1>Welcome {username}</h1>
            <h1>Welcome {username}</h1>
            <h1>Welcome {username}</h1>
            <h1>Welcome {username}</h1>
            <h1>Welcome {username}</h1>
            <h1>Welcome {username}</h1>
            <h1>Welcome {username}</h1>
            <h1>Welcome {username}</h1>
            <h1>Welcome {username}</h1>
            <h1>Welcome {username}</h1>
        </div>
    );
};

Home.propTypes = {
    user: PropTypes.object
};

export default connect(mapStateToProps)(Home);
