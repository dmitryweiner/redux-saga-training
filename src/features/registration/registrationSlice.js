import { createSlice } from '@reduxjs/toolkit';
import apiService, {
    getErrorApiState,
    getErrorMessage,
    getInitialApiState,
    getLoadingApiState,
    getSuccessApiState
} from '../../apiService';
import { push } from 'connected-react-router';

function delay(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    });
}

export const registrationSlice = createSlice({
    name: 'registration',
    initialState: {
        apiState: getInitialApiState(),
        user: null
    },
    reducers: {
        registrationLoading: (state) => {
            state.apiState = getLoadingApiState(state.apiState);
        },
        registrationDone: (state, action) => {
            state.apiState = getSuccessApiState(state.apiState);
            state.user = action.payload;
        },
        registrationError: (state, action) => {
            state.apiState = getErrorApiState(state.apiState, action.payload);
        }
    }
});

export const actions = registrationSlice.actions;

export default registrationSlice.reducer;

export const registrationInit = ({nickname, password}) => dispatch => {
    dispatch(actions.registrationLoading());
    return apiService.user.create({nickname, password})
        .then(response => response.data)
        .then(response => dispatch(actions.registrationDone(response)))
        .then(() => delay(2000))
        .then(() => dispatch(push('/auth')))
        .catch(error => dispatch(actions.registrationError(getErrorMessage(error))));
};

export const selectApiState = state => state.registration.apiState;
