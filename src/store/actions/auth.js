import * as actionTypes from './actionTypes';
import axios from '../../axios/axios-auth';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (tokenId, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        tokenId: tokenId,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expireTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expireTime * 1000);
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {

        dispatch(authStart());

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url = "/signupNewUser?key=AIzaSyBJrLzFwteGXLsU_9BHs0gIrPWBIpkK-Vs";

        if (!isSignUp) {
            url = "/verifyPassword?key=AIzaSyBJrLzFwteGXLsU_9BHs0gIrPWBIpkK-Vs";
        }

        axios.post(url, authData)
            .then(authData => {
                const token = authData.data.idToken;
                const expireTime = authData.data.expiresIn;
                localStorage.setItem('token', token);
                localStorage.setItem('expirationDate', new Date(new Date().getTime() + expireTime * 1000));
                localStorage.setItem('userId', authData.data.localId);
                dispatch(authSuccess(token, authData.data.localId));
                dispatch(checkAuthTimeout(expireTime));
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error));
            });
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckLoginState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');

        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token, localStorage.getItem('userId')));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 60));
            }
        }
    }
}