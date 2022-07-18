import React, { Component } from 'react';
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from "./components/Loader/Loader";
import Button from './components/Button/Button';
import * as API from "./services/pixabyAPI";
import { ToastContainer } from 'react-toastify';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import styles from "./App.module.css";

class App extends Component {

  state = {
    query: "",
    page: 1,
    items: [],
    isLoading: false,
    error: null,
    total: null
  }
  
  componentDidUpdate(_, prevState) {
    const prevQuery = prevState.query;
    const prevPage = prevState.page;
    const { query, page, items } = this.state;
    const defaultPage = 1;

    if( prevQuery !== query ) {
      this.setState({ isLoading: true });
      try {
        API.pixabyAPI( query, defaultPage )
          .then(res => {
            this.setState({
              items: [...res.hits],
              isLoading: false
            })
          })
      } catch (error){
        console.log(error);
      }
    } else if( prevQuery !== query || prevPage !== page ){
     
      try {
        API.pixabyAPI( query, page )
          .then(res => {
            this.setState(state =>({
              items: [...state.items, ...res.hits],
              total: res.total,
              isLoading: false
            }))
          })
      } catch (error){
        console.log(error);
      }
    }

    if( items.length === this.state.total) {
      this.setState({ total: "done" })
    }
  };

  onLoadMoreHandler = () => {
    this.setState(({ page }) => ({
      page: page + 1
    }))
  }

  handleSubmit = (value) => {
    this.setState({ query: value.query })
  };

  render() {
    const { items, isLoading, error, total } = this.state;
    const loading = isLoading && <Loader/>;
    const button = items.length > 0 && total !== "done" && <Button isLoading={isLoading} onClick={this.onLoadMoreHandler}/>;
    const view = !error && <ImageGallery items={items}/>;
    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.handleSubmit}/>
        {view}
        {loading}
        {button}
        <ToastContainer/>
      </div>
    );
  }
}

export default App;
