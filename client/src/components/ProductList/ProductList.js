import React from 'react'
import PropTypes from 'prop-types'
import ProductListElement from '../ProductListElement'

const ProductList = ({ products, onEditingDone, onDelete }) => {
    return (
        <div className="mx-md-auto" style={{ maxWidth: '800px' }}>
            <h2>Products</h2>
            <ul className="list-group ">
                {products.map(
                    ({ id, name, description, stock, rarity, ...stats }) => (
                        <li className="list-group-item" key={id}>
                            <ProductListElement
                                id={id}
                                name={name}
                                description={description}
                                rarity={rarity}
                                stats={stats}
                                stock={stock}
                                onDelete={() => onDelete(id)}
                                onEditingDone={onEditingDone}
                            />
                        </li>
                    )
                )}
            </ul>
        </div>
    )
}

ProductList.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
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
        })
    ),
    onEditingDone: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default ProductList
