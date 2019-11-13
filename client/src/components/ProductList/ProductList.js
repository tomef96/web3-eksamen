import React from 'react'
import PropTypes from 'prop-types'
import ProductListElement from '../ProductListElement'
import Row from '../Grid/Row'
import Column from '../Grid/Column'
import Modal from '../Modal'
import ProductForm from '../ProductForm'
import Grid from '../Grid/Grid'
import Loader from '../Loader/Loader'
import $ from 'jquery'

const ProductList = ({
    products,
    handleCreate,
    handleEdit,
    handleDelete,
    error,
    isLoading
}) => {
    $('#deleteProductModal').on('show.bs.modal', event => {
        let button = $(event.relatedTarget)
        let product = button.data('product')
        let modal = $('#deleteProductModal')
        modal.find('#delete-btn').data('data-id', product.id)
    })

    const mainWindowStyle = {
        maxHeight: '94vh',
        overflowY: 'scroll',
        paddingBottom: '30vh'
    }

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
            <div className="mx-md-auto" style={{ maxWidth: '800px' }}>
                <h2>Products</h2>
                <ul className="list-group ">
                    {products.map(product => (
                        <li className="list-group-item" key={product.id}>
                            <ProductListElement
                                product={product}
                                onEditingDone={handleEdit}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    return (
        <Grid fluid={true}>
            <Row style={{ minHeight: '100vh' }}>
                <Column size={12} className="pt-2" style={mainWindowStyle}>
                    {content()}
                </Column>
            </Row>

            <Modal id="createProductModal">
                <ProductForm onSubmit={handleCreate} />
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
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
}

export default ProductList
