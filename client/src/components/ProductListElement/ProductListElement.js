import React from 'react'
import PropTypes from 'prop-types'
import ProductForm from '../ProductForm'
import { Link } from 'react-router-dom'
import { rarityColors } from '../../constants'
import Modal from '../Modal'

const colors = { strength: '#c22d0c', intellect: '#0c43c2', agility: '#24c20c' }

const ProductListElement = ({
    product: { id, name, description, rarity, stock, imageUrl, ...stats },
    onEditingDone
}) => {
    const stockStyle = {
        color: stock >= 10 ? 'green' : stock >= 5 ? '#e0cc16' : 'red'
    }

    const nameStyle = {
        color: rarityColors[rarity] || 'green'
    }

    const renderStats = () => {
        return Object.keys(stats).map(key => {
            if (stats[key] !== 0) {
                return (
                    <li
                        className="list-inline-item"
                        style={{
                            color: colors[key] || 'grey',
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

    return (
        <div className="d-flex flex-column flex-md-row justify-content-between">
            <div className="d-flex flex-column flex-grow-1">
                <div className="d-flex flex-row">
                    <div className="font-weight-bold">
                        <Link style={nameStyle} to={`/product/${id}`}>
                            {name}
                        </Link>
                    </div>
                    <div className="ml-2" style={stockStyle}>
                        ({stock} in stock)
                    </div>
                </div>
                <div className="font-weight-normal">{description}</div>
                <ul className="list-group list-group-horizontal-sm flex-wrap">
                    {renderStats()}
                </ul>
            </div>

            <img
                className="img-thumbnail img-fluid ml-auto"
                style={{
                    maxWidth: '64px',
                    maxHeight: '64px'
                }}
                src={imageUrl}
                alt="Product"
            />

            <div className="d-flex flex-row align-self-center align-items-center">
                <button
                    className="btn btn-link"
                    data-toggle="modal"
                    data-target={`#editProductModal${id}`}
                >
                    Edit
                </button>
                <button
                    className="btn btn-link text-danger"
                    data-toggle="modal"
                    data-target="#deleteProductModal"
                    data-product={JSON.stringify({ id })}
                >
                    Delete
                </button>
            </div>

            <Modal id={`editProductModal${id}`}>
                <ProductForm
                    editing={{
                        id,
                        name,
                        description,
                        rarity,
                        stock,
                        imageUrl,
                        stats
                    }}
                    onSubmit={product => onEditingDone({ id, ...product })}
                />
            </Modal>
        </div>
    )
}

ProductListElement.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        stats: PropTypes.shape({
            strength: PropTypes.number,
            intellect: PropTypes.number,
            agility: PropTypes.number,
            armour: PropTypes.number,
            damage: PropTypes.number
        })
    }),
    onEditingDone: PropTypes.func.isRequired
}

export default ProductListElement
