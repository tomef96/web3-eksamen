import React from 'react'
import PropTypes from 'prop-types'

const Column = ({ sm, md, lg, xl, size, className, style, children }) => {
    const getClasses = () => {
        const sizes = { sm, md, lg, xl }
        return Object.keys(sizes).reduce((acc, key) => {
            if (sizes[key]) {
                return [...acc, `col-${[key]}-${sizes[key]}`]
            }
            return [...acc]
        }, [])
    }

    return (
        <div
            className={`col-${size} ${getClasses().join(' ')} ${className}`}
            style={style}
        >
            {children}
        </div>
    )
}

Column.propTypes = {
    size: PropTypes.number.isRequired,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number
}

export default Column
