import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../redux/actions'

const links = {
    Products: '/'
}

const mapLinks = () => {
    return Object.keys(links).map(key => {
        return (
            <li
                className="nav-item"
                key={`nav-${key}-link`}
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
            >
                <Link className={`nav-link`} to={links[key]}>
                    {key} <span className="sr-only">(current)</span>
                </Link>
            </li>
        )
    })
}

const Navbar = ({ logout }) => {
    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light shadow-sm">
            <Link
                className="navbar-brand"
                to="#"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                Loot Lunatics
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon" />
            </button>

            <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
            >
                <ul className="navbar-nav mr-auto">{mapLinks()}</ul>
                <ul className="navbar-nav ml-auto">
                    <li
                        className="nav-item"
                        data-toggle="collapse"
                        data-target=".navbar-collapse.show"
                    >
                        <Link
                            className="nav-link"
                            to="#"
                            onClick={() => {
                                logout()
                                window.localStorage.removeItem('auth')
                            }}
                        >
                            Logout
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func
}

export default connect(
    null,
    { logout }
)(Navbar)
