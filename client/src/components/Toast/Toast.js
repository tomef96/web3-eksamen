import React from 'react'
import PropTypes from 'prop-types'

const Toast = ({ header, body, autohide, delay }) => {
    return (
        <div
            className="toast"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            data-delay={delay}
            data-autohide={autohide}
        >
            <div className="toast-header">
                <img
                    src="weeb.png"
                    className="rounded mr-2"
                    style={{ width: '50px' }}
                    alt="Kawaii josei"
                />
                <strong className="mr-auto">{header}</strong>
                <small>Just now</small>
                <button
                    type="button"
                    className="ml-2 mb-1 close"
                    data-dismiss="toast"
                    aria-label="Close"
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="toast-body">{body}</div>
        </div>
    )
}

Toast.propTypes = {
    header: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    autohide: PropTypes.bool,
    delay: PropTypes.number
}

Toast.defaultProps = {
    autohide: false,
    delay: 2000
}

export default Toast
