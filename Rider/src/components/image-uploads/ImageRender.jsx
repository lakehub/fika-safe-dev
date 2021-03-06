import React, { Component } from 'react';
// handle image file uploads
import Spinner from 'components/image-uploads/Spinner';
import Images from 'components/image-uploads/Image';
import Buttons from 'components/image-uploads/Button';
// import ImageUpload from 'components/image-uploads/ImageUpload.jsx';
import 'components/image-uploads/App.css';
import { url } from 'domain.js';

export default class App extends Component {
  state = {
    uploading: false,
    images: [],
  };

  onChange = e => {
    const files = Array.from(e.target.files);
    this.setState({ uploading: true });

    const formData = new FormData();

    files.forEach((file, i) => {
      formData.append(i, file);
    });

    fetch(`${url}/image-upload`, {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(images => {
        this.setState({
          uploading: false,
          images,
        });
      });
  };

  removeImage = id => {
    this.setState({
      images: this.state.images.filter(image => image.public_id !== id),
    });
  };

  render() {
    const { uploading, images } = this.state;

    const content = () => {
      switch (true) {
        case uploading:
          return <Spinner />;
        case images.length > 0:
          return <Images images={images} removeImage={this.removeImage} />;
        default:
          return <Buttons onChange={this.onChange} />;
      }
    };

    return (
      <div className="cop">
        <div className="buttons">{content()}</div>
      </div>
    );
  }
}
