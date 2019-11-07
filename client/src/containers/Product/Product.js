import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

const Product = ({
    match: {
        params: { id }
    }
}) => {
    const [product, setProduct] = useState(undefined)

    const fetchProduct = id => {
        axios
            .get(`/products/${id}`)
            .then(res => {
                setProduct(res.data)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        fetchProduct(id)
    }, [id])

    return <div>{product ? product.name : null}</div>
}

Product.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({ id: PropTypes.string.isRequired })
    })
}

export default Product
