import { LOGIN } from '../actionTypes';

const initialState = {};

export default function(state = initialState, action) {
    switch (action.type) {
        case LOGIN: {
            const { username } = action.payload;
            console.log(username);
            return {
                username
            };
        }
        default:
            return state;
    }
}
