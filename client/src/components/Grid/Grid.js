import React from 'react'
import PropTypes from 'prop-types'

const Grid = ({ fluid, className, children }) => {
    return (
        <div
            className={`${
                fluid ? 'container-fluid' : 'container'
            } ${className}`}
        >
            {children}
        </div>
    )
}

Grid.propTypes = {
    fluid: PropTypes.bool
}

export default Grid
