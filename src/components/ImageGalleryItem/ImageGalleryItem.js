import React, { Component } from 'react';
import Modal from "../Modal/Modal";
import PropTypes from "prop-types";
import styles from "./ImageGalleryItem.module.css";

class ImageGalleryItem extends Component {

    state = {
        modalIsOpen: false
    }

    componentDidMount() {
        this.handleKeyDown();
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.handleKeyDown)
    }

    onModalOpen = () => {
        this.setState({ modalIsOpen: true })
    }

    onModalClose = () => {
        this.setState({ modalIsOpen: false })
    }

    handleKeyDown = () => {
        window.addEventListener("keydown", e => {
            if(e.code === "Escape") {
                this.onModalClose();
            }
        })
    }

    handleBackdropClick = (e) => {
        if( e.currentTarget === e.target) {
            this.onModalClose();
        }
    }

    render() {
        const { webformatURL, largeImageURL } = this.props;
        const { modalIsOpen } = this.state;
        return (
            <>
                <li 
                    onClick={this.onModalOpen}
                    className={styles.ImageGalleryItem}>
                    <img 
                        className={styles.ImageGalleryItemImage} 
                        src={webformatURL} 
                        alt="pixelby" 
                    />
                </li>
                {modalIsOpen && <Modal onClose={this.handleBackdropClick} url={largeImageURL}/>}
            </>
        );
    }
};

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired
}

export default ImageGalleryItem;