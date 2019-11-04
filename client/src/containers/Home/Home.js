import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUser } from '../../redux/selectors'
import axios from 'axios'

const mapStateToProps = state => {
    const user = getUser(state)
    return { user }
}

const Home = ({ user: { username } }) => {
    const [names, setNames] = useState([])
    const [name, setName] = useState(undefined)

    const fetchNames = () => {
        axios
            .get('/names')
            .then(res => {
                setNames(res.data)
            })
            .catch(error => console.log(error))
    }

    const fetchOneName = id => {
        axios
            .get(`/names/${id}`)
            .then(res => {
                setName(res.data)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        fetchNames()
        fetchOneName(3)
    }, [])

    return (
        <div className="container">
            <h1>Welcome {username}</h1>
            <h2>/names</h2>
            <ul>
                {names.map((name, key) => (
                    <li key={`${name}_${key}`}>{name}</li>
                ))}
            </ul>
            <h2>/names/3</h2>
            <p>{name}</p>
        </div>
    )
}

Home.propTypes = {
    user: PropTypes.object
}

export default connect(mapStateToProps)(Home)
