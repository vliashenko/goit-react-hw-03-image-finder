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
    const { query, page } = this.state;

    if(prevQuery !== query || prevPage !== page) {
      this.fetchData(query, page);
    }
  };

  fetchData = async (query, page) => {
    this.setState({ isLoading: true })
    try {
      const data = await API.pixabyAPI(query, page)
          this.setState(prevState => ({
            items: [...prevState.items, ...data.hits],
            total: data.total,
            isLoading: false,
          }));
    } catch (error) {
      this.setState({ isLoading: false })
      console.log(error);
    }
  }

  onLoadMoreHandler = () => {
    this.setState(({ page }) => ({
      page: page + 1
    }))
  }

  handleSubmit = (value) => {
    this.setState({ query: value.query })
  };

  onNewSearchReset = (query) => {
    this.setState({ query, items: [], page: 1 })
  }

  render() {
    const { items, isLoading, error, total } = this.state;
    const loading = isLoading && <Loader/>;
    const button = items.length > 0 && total > items.length ? <Button isLoading={isLoading} onClick={this.onLoadMoreHandler}/> : null;
    const view = !error && <ImageGallery items={items}/>;
    return (
      <div className={styles.App}>
        <Searchbar onReset={this.onNewSearchReset} onSubmit={this.handleSubmit}/>
        {view}
        {loading}
        {button}
        <ToastContainer/>
      </div>
    );
  }
}

export default App;
