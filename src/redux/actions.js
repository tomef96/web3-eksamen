import { LOGIN } from './actionTypes';

export const login = username => ({
    type: LOGIN,
    payload: {
        username
    }
});
