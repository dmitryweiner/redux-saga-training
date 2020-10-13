import { createSelector } from 'reselect';
import { createSlice } from '@reduxjs/toolkit';
import {put, select, takeEvery} from "@redux-saga/core/effects";

export const FilterValue = {
    ALL: 1,
    DONE: 2,
    UNDONE: 3
};

export const listSlice = createSlice({
    name: 'list',
    initialState: {
        list: [],
        filteredList: [],
        filter: FilterValue.ALL
    },
    reducers: {
        add: (state, action) => {
            const newItem = {
                id: Math.random().toString(36).substring(2),
                value: action.payload,
                isDone: false
            };
            state.list = [...state.list, newItem];
        },
        delete: (state, action) => {
            const newList = state.list.filter(item => item.id !== action.payload);
            state.list = [...newList];
        },
        toggleDone: (state, action) => {
            const newList = state.list.map(item => {
                if (item.id === action.payload) {
                    item.isDone = !item.isDone;
                }
                return item;
            });
            state.list = [...newList];
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
        setFilteredList: (state, action) => {
            state.filteredList = action.payload;
        }
    },
});


export const actions = listSlice.actions;
export default listSlice.reducer;

const listSelector = state => state.list.list;

const filterSelector = state => state.list.filter;

export const selectFilteredItems = createSelector(
    listSelector,
    filterSelector,
    (list, filter) => {
        switch (filter) {
            case FilterValue.DONE: return list.filter(item => item.isDone);
            case FilterValue.UNDONE: return list.filter(item => !item.isDone);
            default: return list;
        }
    }
);

export const selectAllItemsCount = createSelector(
    listSelector,
    list => list.length
);

export const selectDoneItemsCount = createSelector(
    listSelector,
    list => list.filter(item => item.isDone).length
);

export const selectUndoneItemsCount = createSelector(
    listSelector,
    list => list.filter(item => !item.isDone).length
);

export function *listSaga() {
    yield takeEvery(
        [
            actions.setFilter.type,
            actions.add.type,
            actions.delete.type,
            actions.toggleDone.type,
        ],
        filterChangedSaga
    );
}

function *filterChangedSaga(action) {
    const filteredList = yield select(selectFilteredItems);
    yield put(actions.setFilteredList(filteredList));
}
