import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    actions,
    FilterValue,
    selectAllItemsCount,
    selectDoneItemsCount,
    selectUndoneItemsCount
} from "./listSlice";
import styles from './Filter.module.css';

export default function Filter() {
    const dispatch = useDispatch();
    const filter = useSelector(state => state.list.filter);
    const allCount = useSelector(selectAllItemsCount);
    const doneCount = useSelector(selectDoneItemsCount);
    const undoneCount = useSelector(selectUndoneItemsCount);

    function handleClick(selected) {
        dispatch(actions.setFilter(selected));
    }

    return <div className={styles.filter}>
        <a
            className={filter === FilterValue.ALL ? styles.active : null}
            onClick={() => handleClick(FilterValue.ALL)}
        >
            all ({allCount})
        </a>
        &nbsp;
        <a
            className={filter === FilterValue.DONE ? styles.active : null}
            onClick={() => handleClick(FilterValue.DONE)}
        >
            done ({doneCount})
        </a>
        &nbsp;
        <a
            className={filter === FilterValue.UNDONE ? styles.active : null}
            onClick={() => handleClick(FilterValue.UNDONE)}
        >
            undone ({undoneCount})
        </a>
    </div>;
}
