import React from "react";
import {useDispatch} from "react-redux";
import {actions} from "./listSlice";

export default function ListItem({item}) {
    const dispatch = useDispatch();
    return (
        <div className="list-item">
            <input type="checkbox" checked={item.isDone} onChange={() => dispatch(actions.toggleDone(item.id))}/>
            &nbsp;
            { item.value }
            &nbsp;
            <button onClick={() => dispatch(actions.delete(item.id))}>x</button>
        </div>
    );
}
