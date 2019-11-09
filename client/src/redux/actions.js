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

export const postProduct = ({ name, description, stock, rarity, stats }) => {
    return dispatch => {
        return axios
            .post('/products', { name, description, rarity, stock, ...stats })
            .then(
                res => {
                    dispatch(fetchProducts())
                },
                error => {
                    console.log(error.response)
                }
            )
    }
}

export const putProduct = ({ id, name, description, stock, rarity, stats }) => {
    return dispatch => {
        return axios
            .put(`/products/${id}`, {
                id,
                name,
                stock,
                rarity,
                description,
                ...stats
            })
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

export const authenticate = (credentials, onError) => {
    return dispatch => {
        return axios.post('/auth', credentials).then(
            res => {
                dispatch(login(credentials.username))
                // Set token in localstorage to stay logged in on refresh.
                window.localStorage.setItem('auth', res.data.token)
            },
            error => {
                console.log(error)
                switch (error.response.status) {
                    case 401: {
                        onError("Are you sure you didn't misspell something?")
                        break
                    }
                    default: {
                        onError('The service might not be available')
                        break
                    }
                }
            }
        )
    }
}
