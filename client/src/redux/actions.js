import {
    LOGIN,
    LOGOUT,
    REQUEST_PRODUCTS,
    RECEIVE_PRODUCTS,
    RECEIVE_ERROR
} from './actionTypes'
import axios from 'axios'

export const login = username => ({
    type: LOGIN,
    payload: {
        username
    }
})

export const logout = () => ({
    type: LOGOUT,
    payload: {}
})

const requestProducts = () => ({
    type: REQUEST_PRODUCTS
})

const receiveProducts = products => ({
    type: RECEIVE_PRODUCTS,
    payload: products
})

const receiveError = error => ({
    type: RECEIVE_ERROR,
    payload: error
})

export const fetchProducts = () => {
    return dispatch => {
        dispatch(requestProducts())
        return axios
            .get('/products')
            .then(
                res => dispatch(receiveProducts(res.data)),
                error => dispatch(receiveError(error))
            )
    }
}

export const postProduct = (name, description, stats) => {
    return dispatch => {
        return axios.post('/products', { name, description, ...stats }).then(
            res => {
                console.log(res)
                dispatch(fetchProducts())
            },
            error => {
                console.log(error.response)
            }
        )
    }
}

export const putProduct = ({ id, name, description, stats }) => {
    return dispatch => {
        return axios
            .put(`/products/${id}`, { id, name, description, ...stats })
            .then(res => dispatch(fetchProducts()), error => console.log(error))
    }
}

export const deleteProduct = id => {
    return dispatch => {
        return axios
            .delete(`/products/${id}`)
            .then(
                res => dispatch(fetchProducts()),
                error => console.log(error.response)
            )
    }
}
