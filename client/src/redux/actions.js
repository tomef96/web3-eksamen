import { LOGIN } from './actionTypes';
import { LOGOUT } from './actionTypes';

export const login = username => ({
    type: LOGIN,
    payload: {
        username
    }
});

export const logout = () => ({
    type: LOGOUT,
    payload: {}
});
