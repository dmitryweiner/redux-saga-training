import {useDispatch} from "react-redux";
import React, {useState} from "react";
import {actions} from "./listSlice";

export default function Form (){
    const [value, setValue] = useState('');
    const dispatch = useDispatch();

    function handleSave(event) {
        event.preventDefault();
        dispatch(actions.add(value));
        setValue('');
    }

    return (
        <div>
            <form>
                <input
                    type="text"
                    value={ value }
                    onChange={
                        (event) => setValue(event.target.value)
                    }
                />
                <button
                    onClick={ handleSave }
                >
                    save
                </button>
            </form>
        </div>
    );
}