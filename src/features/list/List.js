import React from "react";
import {useSelector} from "react-redux";
import ListItem from "./ListItem";

export default function List() {
    const list = useSelector(state => state.list.filteredList);
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