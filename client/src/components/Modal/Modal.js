import React from 'react'
import PropTypes from 'prop-types'

const Modal = ({ children, id }) => {
    return (
        <div
            className="modal fade m-0 p-0"
            id={id}
            tabIndex="-1"
            role="dialog"
            aria-labelledby={id}
            aria-hidden="true"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">{children}</div>
            </div>
        </div>
    )
}

Modal.propTypes = {
    id: PropTypes.string.isRequired
}

export default Modal
