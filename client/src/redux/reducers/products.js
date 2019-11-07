import {
    REQUEST_PRODUCTS,
    RECEIVE_PRODUCTS,
    RECEIVE_ERROR
} from '../actionTypes'

const initialState = {
    products: [],
    isLoading: true,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_PRODUCTS: {
            console.log('Requesting products')
            return {
                ...state,
                isLoading: state.products.length === 0
            }
        }
        case RECEIVE_PRODUCTS: {
            console.log('Received products')
            const products = action.payload
            return {
                ...state,
                products,
                error: null,
                isLoading: false
            }
        }
        case RECEIVE_ERROR: {
            console.log('Received error')
            const error = action.payload.message
            return {
                ...state,
                error,
                isLoading: false
            }
        }
        default:
            return state
    }
}
