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

const mapStateToProps = state => {
    // { products, isLoading, error }
    return { ...getProducts(state) }
}

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

    const handleDelete = event => {
        let id = $('#delete-btn').data('data-id')
        console.log(id)
        deleteProduct(id)
    }

    const handleCreate = (name, description, stats) => {
        postProduct(name, description, stats)
    }

    const handleEditingDone = product => {
        console.log(product)
        putProduct(product)
    }

    const mainWindowStyle = {
        maxHeight: '94vh',
        overflowY: 'scroll',
        paddingBottom: '30vh'
    }
    console.log({ products, isLoading, error })

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
                onEditingDone={handleEditingDone}
                onDelete={handleDelete}
            />
        )
    }

    $('#deleteProductModal').on('show.bs.modal', event => {
        let button = $(event.relatedTarget)
        let product = button.data('product')
        let modal = $('#deleteProductModal')
        modal.find('#delete-btn').data('data-id', product.id)
    })

    return (
        <div className="container-fluid">
            <div className="row" style={{ minHeight: '100vh' }}>
                <div
                    className="col-12 col-md-2 p-0"
                    style={{ backgroundColor: '#f5f5f5' }}
                >
                    <SideNav />
                </div>
                <div className="col-12 col-md-10 pt-2" style={mainWindowStyle}>
                    {content()}
                </div>
            </div>

            <div
                className="modal fade"
                id="createProductModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="createProductModal"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <ProductForm onSubmit={handleCreate} />
                    </div>
                </div>
            </div>

            <div
                className="modal fade"
                id="deleteProductModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="deleteProductModal"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content d-flex flex-column justify-content-center align-items-center">
                        <div className="modal-body">
                            <h4>Are you sure?</h4>
                        </div>
                        <div className="modal-footer">
                            <button
                                id="delete-btn"
                                className="btn btn-danger"
                                data-dismiss="modal"
                                onClick={() => handleDelete(this)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Home.propTypes = {
    user: PropTypes.object
}

export default connect(
    mapStateToProps,
    { fetchProducts, postProduct, putProduct, deleteProduct }
)(Home)
