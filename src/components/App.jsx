import React from 'react';
import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    images: [],
    page: 1,
    isLoading: false,
    search: '',
    openModal: false,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const KEY = `27598952-802517bdfa4ff8ef34e84ef82`;
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.setState({ isLoading: true });

      fetch(
        `https://pixabay.com/api/?q=${search}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => response.json())
        .then(data => {
          const imgs = data.hits;
          const image = imgs.map(img => {
            const images = {
              id: img.id,
              largeImageURL: img.largeImageURL,
              webformatURL: img.webformatURL,
              tags: img.tags,
            };
            console.log(images);
            return images;
          });
          console.log(image);
          return image;
        })
        .then(image => {
          console.log(image);
        
          this.setState({ images: image})
        }
          
        )
        .catch(error => {
          alert("oops, something wrong, try again");
          console.log(error.message)})
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  formSubmit = search => {
    this.setState(() => {
      return {
        search,
        page: 1,
      };
    });
  };

  loadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
       
      };
    });
  };
  onModalOpen = largeImage => {
    this.setState({ largeImageURL: largeImage });
    this.setState(({ openModal }) => ({
      openModal: !openModal,
    }));
  };

  toggleModal = () => {
    this.setState(({ openModal }) => ({
      openModal: !openModal,
    }));
  };

  render() {
    const { images, isLoading, openModal, largeImageURL } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.formSubmit} />
        {images.length > 0 && (
          <>
            <ImageGallery imgs={images} onClick={this.onModalOpen} />
            <Button onClick={this.loadMore} />
          </>
        )}
        {isLoading && <Loader />}
        {openModal && (
          <Modal onCloseModal={this.toggleModal} src={largeImageURL} />
        )}
      </div>
    );
  }
}
