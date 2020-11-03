import { createSlice } from '@reduxjs/toolkit';
import apiService, {
    getErrorApiState,
    getErrorMessage,
    getInitialApiState,
    getLoadingApiState,
    getSuccessApiState
} from '../../apiService';
import { push } from 'connected-react-router';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogged: false,
        apiState: getInitialApiState(),
        redirectPath: ''
    },
    reducers: {
        setIsLogged: (state) => {
            state.isLogged = true;
        },
        setIsNotLogged: (state) => {
            state.isLogged = false;
        },
        authLoading: (state, action) => {
            state.apiState = getLoadingApiState();
        },
        authDone: (state, action) => {
            state.apiState = getSuccessApiState(state);
            state.isLogged = true;
        },
        authError: (state, action) => {
            state.apiState = getErrorApiState(state, action.payload);
            state.isLogged = false;
        },
        setRedirectPath: (state, action) => {
            state.redirectPath = action.payload;
        }
    }
});

export const authInit = ({nickname, password}) => (dispatch, getState) => {
    dispatch(actions.authLoading());
    return apiService.auth.login({nickname, password})
        .then(() => dispatch(actions.authDone()))
        .then(() => {
            const redirectPath = getState().auth.redirectPath;
            if (redirectPath && redirectPath !== '/auth') {
                dispatch(push(getState().auth.redirectPath));
            } else {
                dispatch(push('/user'));
            }
            dispatch(actions.setRedirectPath(''));
        })
        .catch(error => dispatch(actions.authError(getErrorMessage(error))));
};

export const authCheck = (path) => dispatch => {
    actions.setRedirectPath(path);
    apiService.auth.check()
        .then(() => {
            dispatch(actions.setIsLogged());
            dispatch(actions.setRedirectPath(''));
        })
        .catch(() => {
            dispatch(actions.setIsNotLogged());
            dispatch(push('/auth'));
        });
};

export const authLogout = () => dispatch => {
    apiService.auth.logout()
        .then(() => {
            dispatch(actions.setIsNotLogged());
            dispatch(push('/auth'));
        });
}

export default authSlice.reducer;

export const selectApiState = state => state.auth.apiState;

export const selectIsLogged = state => state.auth.isLogged;

export const selectCurrentPath = state => state.router.location.pathname;

export const actions = authSlice.actions;
