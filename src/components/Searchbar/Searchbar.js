import React from 'react';
import SearchForm from "../SearchForm/SearchForm";
import PropTypes from "prop-types";
import styles from "./Searchbar.module.css";

const Searchbar = ({ onSubmit }) => {
    return (
        <header className={styles.Searchbar}>
           <SearchForm onSubmit={onSubmit}/>
        </header>
    );
};

Searchbar.protoTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default Searchbar;