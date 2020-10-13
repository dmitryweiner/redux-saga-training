import React from "react";
import Filter from "./Filter";
import Form from "./Form";
import List from "./List";
import styles from './ListView.module.css';

export default function ListView() {
    return <div className={styles.root}>
            <Form/>
            <Filter/>
            <List/>
        </div>;
}