import * as actionTypes from './actionTypes';
import axios from '../../axios/axios-auth';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email, password) => {
    return dispatch => {

        dispatch(authStart());

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        axios.post('', authData)
            .then(authData => {
                console.log(authData);
                dispatch(authSuccess(authData));
            })
            .catch(error => {
                console.log(error);
                dispatch(authFail(error));
            });
    }
}