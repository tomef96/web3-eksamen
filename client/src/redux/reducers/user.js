import { LOGIN, LOGOUT } from '../actionTypes';

const initialState = {
    username: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case LOGIN: {
            const { username } = action.payload;
            return {
                ...state,
                username
            };
        }
        case LOGOUT: {
            return { ...state, username: null };
        }
        default:
            return state;
    }
}
