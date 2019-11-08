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
import ProductForm from '../../components/ProductForm'
import SideNav from '../../components/SideNav'
import ProductList from '../../components/ProductList'
import Loader from '../../components/Loader/Loader'
import $ from 'jquery'
import Modal from '../../components/Modal'
import Grid from '../../components/Grid/Grid'
import Row from '../../components/Grid/Row'
import Column from '../../components/Grid/Column'

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

    $('#deleteProductModal').on('show.bs.modal', event => {
        let button = $(event.relatedTarget)
        let product = button.data('product')
        let modal = $('#deleteProductModal')
        modal.find('#delete-btn').data('data-id', product.id)
    })

    const content = () => {
        const center =
            'col-12 d-flex h-100 justify-content-center align-items-center'
        if (isLoading)
            return (
                <div className={center}>
                    <Loader />
                </div>
            )
        if (error) return <div className={center}>{error}</div>
        return (
            <ProductList
                products={products}
                onEditingDone={putProduct}
                onDelete={handleDelete}
            />
        )
    }

    const mainWindowStyle = {
        maxHeight: '94vh',
        overflowY: 'scroll',
        paddingBottom: '30vh'
    }

    return (
        <Grid fluid={true}>
            <Row style={{ minHeight: '100vh' }}>
                <Column size={12} md={2} style={{ backgroundColor: '#f5f5f5' }}>
                    <SideNav />
                </Column>
                <Column
                    size={12}
                    md={10}
                    className="pt-2"
                    style={mainWindowStyle}
                >
                    {content()}
                </Column>
            </Row>

            <Modal id="createProductModal">
                <ProductForm onSubmit={postProduct} />
            </Modal>

            <Modal id="deleteProductModal">
                <div className="modal-body">
                    <h4>Are you sure?</h4>
                </div>
                <div className="modal-footer">
                    <button
                        id="delete-btn"
                        className="btn btn-danger"
                        data-dismiss="modal"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            </Modal>
        </Grid>
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
