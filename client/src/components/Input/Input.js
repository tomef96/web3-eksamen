import React from 'react'
import PropTypes from 'prop-types'

const Input = ({
    onChange,
    placeholder,
    name,
    type,
    autoFocus,
    value,
    label,
    ...rest
}) => {
    return (
        <div className="form-group">
            {label ? <label>{placeholder}</label> : null}
            <input
                {...rest}
                className="form-control"
                autoFocus={autoFocus}
                type={type}
                placeholder={placeholder}
                name={name}
                data-test={name}
                onChange={e => onChange(e.target.value)}
                value={value}
            />
        </div>
    )
}

Input.propTypes = {
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    autoFocus: PropTypes.bool
}

Input.defaultProps = {
    type: 'text',
    autoFocus: false
}

export default Input
