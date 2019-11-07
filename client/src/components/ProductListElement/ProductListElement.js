import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ProductForm from '../ProductForm'

const colors = { strength: '#c22d0c', intellect: '#0c43c2', agility: '#24c20c' }

const ProductListElement = ({
    id,
    name,
    description,
    stats,
    onDelete,
    onEditingDone
}) => {
    const [isEditing, setIsEditing] = useState(false)

    const renderStats = () => {
        return Object.keys(stats).map(key => {
            if (stats[key] !== 0) {
                return (
                    <li
                        className="list-inline-item"
                        style={{
                            color: colors[key] || 'grey',
                            /*borderRight: 'solid grey 1px',*/
                            paddingRight: '10px'
                        }}
                        key={key}
                    >
                        {key[0].toUpperCase() + key.slice(1)}: {stats[key]}
                    </li>
                )
            } else {
                return null
            }
        })
    }

    const handleDoneEditing = product => {
        onEditingDone(product)
    }

    if (isEditing) {
        return (
            <ProductForm
                editing={{ name, description, stats }}
                onSubmit={(name, description, stats) => {
                    setIsEditing(false)
                    handleDoneEditing({ id, name, description, stats })
                }}
            />
        )
    }

    return (
        <div className="d-flex flex-column flex-md-row justify-content-between">
            <div className="d-flex flex-column">
                <div className="font-weight-bold">{name}</div>
                <div className="font-weight-normal">{description}</div>
                <ul className="list-group list-group-horizontal-sm flex-wrap">
                    {renderStats()}
                </ul>
            </div>
            <div className="d-flex flex-row align-self-center align-items-center">
                <button
                    className="btn btn-link"
                    onClick={() => setIsEditing(true)}
                >
                    Edit
                </button>
                <button
                    className="btn btn-link text-danger"
                    data-toggle="modal"
                    data-target="#deleteProductModal"
                    data-product={JSON.stringify({
                        id,
                        name,
                        description,
                        stats
                    })}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

ProductListElement.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    stats: PropTypes.shape({
        strength: PropTypes.number,
        intellect: PropTypes.number,
        agility: PropTypes.number,
        armour: PropTypes.number,
        damage: PropTypes.number
    }),
    onDelete: PropTypes.func.isRequired,
    onEditingDone: PropTypes.func.isRequired
}

export default ProductListElement
