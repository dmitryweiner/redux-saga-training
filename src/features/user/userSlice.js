import { createSlice } from "@reduxjs/toolkit";
import apiService from '../../apiService';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null
    },
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        }
    }
});

export const userInit = () => dispatch => {
    apiService.user.getCurrent()
        .then(response => response.data)
        .then(response => dispatch(actions.setCurrentUser(response)));
};

export default userSlice.reducer;

export const selectCurrentUser = state => state.user.currentUser;

export const actions = userSlice.actions;

