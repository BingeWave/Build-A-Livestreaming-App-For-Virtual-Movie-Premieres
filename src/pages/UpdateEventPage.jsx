import React from 'react';

import API from '../util/Api';

import { withRouter } from "react-router";

import Errors from '../components/errors';

class UpdateEventPage extends React.Component {

  constructor(props) {

    super(props);

    this.uploadMainImage = this.uploadMainImage.bind(this);
    this.uploadWatermark = this.uploadWatermark.bind(this);
    this.uploadOverlay = this.uploadOverlay.bind(this);

    this.state = {
      event: {},
      mainImageErrors: null,
      watermarkErrors: null,
      overlayErrors: null,
      mainImageFile: null,
      watermarkFile: null,
      overlayFile: null
    };

  }

  componentDidMount() {

    const id = this.props.match.params.id;

    let that = this;

    API.getEvent(id, function (data) {
      that.setState({ event: data });
    }, function (errors) {

    });
  }

  uploadMainImage() {

    if (this.state.mainImageFile) {

      let that = this;

      API.uploadEventMainImage(this.state.event.id, this.state.mainImageFile, function (data) {

        that.setState({ mainImageErrors: null, mainImageFile : null });
        alert("Main image sucessfully uploaded!");

      }, function (errors) {
        that.setState({ mainImageErrors: errors });
      })

    } else {
      this.setState({ mainImageErrors: { nofile: 'A image file is required' } });
    }

  }

  uploadWatermark() {

    if (this.state.watermarkFile) {

      let that = this;

      API.uploadEventWatermarkImage(this.state.event.id, this.state.watermarkFile, function (data) {
        that.setState({ watermarkErrors: null, watermarkFile : null });
        alert("Watermark image sucessfully uploaded!");
      }, function (errors) {
        that.setState({ watermarkErrors: errors });
      })
      
    } else {
      this.setState({ watermarkErrors: { nofile: 'A image file is required' } });
    }

  }

  uploadOverlay() {

    if (this.state.overlayFile) {

      let that = this;

      API.uploadEventOverlayImage(this.state.event.id, this.state.overlayFile, function (data) {
        that.setState({ overlayErrors: null, overlayFile : null });
        alert("Overlay image sucessfully uploaded!");
      }, function (errors) {
        that.setState({ overlayErrors: errors });
      })
      
    } else {
      this.setState({ overlayErrors: { nofile: 'An image file is required' } });
    }

  }



  render() {

    const hasmainImageErrors = this.state.mainImageErrors;

    let imageErrorTag;

    if (hasmainImageErrors) {
      imageErrorTag = <Errors errors={this.state.mainImageErrors} />;
    } else {
      imageErrorTag = '';
    }

    const haswatermarkErrors = this.state.watermarkErrors;

    let watermarkErrorTag;

    if (haswatermarkErrors) {
      watermarkErrorTag = <Errors errors={this.state.watermarkErrors} />;
    } else {
      watermarkErrorTag = '';
    }

    const hasoverlayErrors = this.state.overlayErrors;

    let overlayErrorTag;

    if (hasoverlayErrors) {
      overlayErrorTag = <Errors errors={this.state.overlayErrors} />;
    } else {
      overlayErrorTag = '';
    }

    return (
      <div className="container mt-2">

        <h2>Update Media For {this.state.event.title}</h2>

        <div className="card card-body bg-light mb-3">
          <label>Main Image File</label><br />
          <input type="file" onChange={(e) => this.setState({ mainImageFile: e.target.files[0] })} /><br />
          {imageErrorTag}
          <button className="btn btn-success" type="button" onClick={this.uploadMainImage} >Upload</button>
        </div>

        <div className="card card-body bg-light mb-3">
          <label>Watermark Image File</label><br />
          <input type="file" onChange={(e) => this.setState({ watermarkFile: e.target.files[0] })} /><br />
          {watermarkErrorTag}
          <button className="btn btn-success" type="button" onClick={this.uploadWatermark} >Upload</button>
        </div>

        <div className="card card-body bg-light mb-3">
          <label>Overlay Image File</label><br />
          <input type="file" onChange={(e) => this.setState({ overlayFile: e.target.files[0] })} />
          {overlayErrorTag}
          <button className="btn btn-success" type="button" onClick={this.uploadOverlay}>Upload</button>
        </div>

      </div>);
  }
}

export default withRouter(UpdateEventPage);