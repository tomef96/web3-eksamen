import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProducts } from '../../redux/selectors'
import {
    fetchProducts,
    postProduct,
    putProduct,
    deleteProduct
} from '../../redux/actions'

import $ from 'jquery'
import ProductList from '../../components/ProductList'

const Home = ({
    products,
    isLoading,
    error,
    fetchProducts,
    postProduct,
    putProduct,
    deleteProduct
}) => {
    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

    const handleDelete = () => {
        let id = $('#delete-btn').data('data-id')
        deleteProduct(id)
    }

    return (
        <ProductList
            products={products}
            error={error}
            handleCreate={postProduct}
            handleEdit={putProduct}
            handleDelete={handleDelete}
            isLoading={isLoading}
        />
    )
}

Home.propTypes = {
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
    ).isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    fetchProducts: PropTypes.func,
    postProduct: PropTypes.func,
    putProduct: PropTypes.func,
    deleteProduct: PropTypes.func
}

export default connect(
    state => ({ ...getProducts(state) }),
    { fetchProducts, postProduct, putProduct, deleteProduct }
)(Home)
