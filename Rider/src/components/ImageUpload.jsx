import React from 'react';
import '../assets/css/img.css';
import { faImages, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: '', imagePreviewUrl: '' };
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    this.props.handleImageSubmit(this.state.file);
    console.log('handle uploading-', this.state.file);
    console.log('handle uploading-', this.state.imagePreviewUrl);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    let { imagePreviewUrl, file } = this.state;
    console.log(file);
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <img src={imagePreviewUrl} />;
    } else {
      $imagePreview = (
        <div className="previewText">
          {/* Please select an Image for Preview */}
          <label htmlFor="single">
            <FontAwesomeIcon icon={faImage} color="#3B5998" size="10x" />
          </label>
        </div>
      );
    }

    return (
      <div className="previewComponent">
        <form onSubmit={e => this._handleSubmit(e)}>
          <input
            className="fileInput"
            type="file"
            onChange={e => this._handleImageChange(e)}
          />
        </form>
        <div className="imgPreview">{$imagePreview}</div>
        <button
          className="submitButton"
          type="submit"
          onClick={e => this._handleSubmit(e)}
        >
          Upload Image
        </button>
      </div>
    );
  }
}
