import React from 'react';

import API from '../util/Api';

import { withRouter } from "react-router";

import Errors from '../components/errors';

class UpdateVideoPage extends React.Component {

  constructor(props) {

    super(props);

    this.uploadVideo = this.uploadVideo.bind(this);
    this.uploadPreview = this.uploadPreview.bind(this);
    this.uploadImage = this.uploadImage.bind(this);

    this.state = {
      video: {},
      videoErrors: null,
      previewErrors: null,
      imageErrors: null,
      videoFile: null,
      previewFile: null,
      imageFile: null
    };

  }

  componentDidMount() {

    const id = this.props.match.params.id;

    let that = this;

    API.getVideo(id, function (data) {
      that.setState({ video: data });
    }, function (errors) {

    });
  }

  uploadVideo() {

    if (this.state.videoFile) {

      let that = this;

      API.uploadVideo(this.state.video.id, this.state.videoFile, function (data) {

        that.setState({ videoErrors: null, videoFile : null });
        alert("Video sucessfully uploaded!");

      }, function (errors) {
        that.setState({ videoErrors: errors });
      })

    } else {
      this.setState({ videoErrors: { nofile: 'A Video file is required' } });
    }

  }

  uploadPreview() {

    if (this.state.previewFile) {

      let that = this;

      API.uploadPreview(this.state.video.id, this.state.previewFile, function (data) {
        that.setState({ previewErrors: null, previewFile : null });
        alert("Preview sucessfully uploaded!");
      }, function (errors) {
        that.setState({ previewErrors: errors });
      })
      
    } else {
      this.setState({ previewErrors: { nofile: 'A video file is required' } });
    }

  }

  uploadImage() {

    if (this.state.imageFile) {

      let that = this;

      API.uploadVideoMainImage(this.state.video.id, this.state.imageFile, function (data) {
        that.setState({ imageErrors: null, imageFile : null });
        alert("Image sucessfully uploaded!");
      }, function (errors) {
        that.setState({ imageErrors: errors });
      })
      
    } else {
      this.setState({ imageErrors: { nofile: 'An image file is required' } });
    }

  }



  render() {

    const hasVideoErrors = this.state.videoErrors;

    let videoErrorTag;

    if (hasVideoErrors) {
      videoErrorTag = <Errors errors={this.state.videoErrors} />;
    } else {
      videoErrorTag = '';
    }

    const hasPreviewErrors = this.state.previewErrors;

    let previewErrorTag;

    if (hasPreviewErrors) {
      previewErrorTag = <Errors errors={this.state.previewErrors} />;
    } else {
      previewErrorTag = '';
    }

    const hasImageErrors = this.state.imageErrors;

    let imageErrorTag;

    if (hasImageErrors) {
      imageErrorTag = <Errors errors={this.state.imageErrors} />;
    } else {
      imageErrorTag = '';
    }

    return (
      <div className="container mt-2">

        <h2>Update Media For {this.state.video.title}</h2>

        <div className="card card-body bg-light mb-3">
          <label>Upload Video File</label><br />
          <input type="file" onChange={(e) => this.setState({ videoFile: e.target.files[0] })} /><br />
          {videoErrorTag}
          <button className="btn btn-success" type="button" onClick={this.uploadVideo} >Upload</button>
        </div>

        <div className="card card-body bg-light mb-3">
          <label>Upload Preview File</label><br />
          <input type="file" onChange={(e) => this.setState({ previewFile: e.target.files[0] })} /><br />
          {previewErrorTag}
          <button className="btn btn-success" type="button" onClick={this.uploadPreview} >Upload</button>
        </div>

        <div className="card card-body bg-light mb-3">
          <label>Upload Main Image File</label><br />
          <input type="file" onChange={(e) => this.setState({ imageFile: e.target.files[0] })} />
          {imageErrorTag}
          <button className="btn btn-success" type="button" onClick={this.uploadImage}>Upload</button>
        </div>

      </div>);
  }
}

export default withRouter(UpdateVideoPage);