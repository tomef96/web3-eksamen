import React from 'react'
import PropTypes from 'prop-types'

const Row = ({ children, className, style }) => {
    return (
        <div className={`row ${className}`} style={style}>
            {children}
        </div>
    )
}

Row.propTypes = {
    className: PropTypes.string
}

export default Row
