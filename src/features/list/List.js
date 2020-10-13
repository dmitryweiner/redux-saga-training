import React from "react";
import {useSelector} from "react-redux";
import {selectFilteredItems} from "./listSlice";
import ListItem from "./ListItem";

export default function List() {
    const list = useSelector(selectFilteredItems);
    return (
        <div className="list">
            {
                list.map((item) => {
                    return (
                        <ListItem
                            key={ item.id }
                            item={ item }
                        />
                    )
                })
            }
        </div>
    );
}