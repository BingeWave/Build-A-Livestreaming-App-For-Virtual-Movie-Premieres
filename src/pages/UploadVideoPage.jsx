import React from 'react';

import API from '../util/Api';
import Errors from '../components/errors';

class UploadVideoPage extends React.Component {

  constructor(props) {

    super(props);

    this.submitForm = this.submitForm.bind(this);

    this.state = {
      title: '',
      description: '',
      type: 0,
      selectedFile: null,
      errors: null
    };
  }

  submitForm() {

    let that = this;

    API.createVideo(this.state, function (data) {

      if (that.state.selectedFile) {

        API.uploadVideo(data.id, that.state.selectedFile, function (response) {

          //Completed in uploading video file
          window.location = '/videos';

        }, function (errors) {
          that.setState({ errors: errors });
        });

      } else {
        //No Video File Added
        window.location = '/videos';

      }
    }, function (errors) {
      that.setState({ errors: errors });
    });
  }

  render() {
    const hasErrors = this.state.errors;

    let errorTag;

    if (hasErrors) {
      errorTag = <Errors errors={this.state.errors} />;
    } else {
      errorTag = '';
    }

    return (
      <div className="container mt-3">
        <h2 className="text-center">Upload Video</h2>
        <div>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input type="text" className="form-control" id="title" onChange={(e) => this.setState({ title: e.target.value })} />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea type="text" className="form-control" id="description" rows="3" onChange={(e) => this.setState({ description: e.target.value })}  ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="type" className="form-label">
              Content Type
            </label>
            <select className="form-control" id="type">
              <option value="1">Episode</option>
              <option value="2">Commentary</option>
              <option value="3">Bloopers</option>
              <option value="4">Trailers</option>
              <option value="5">Recap</option>
              <option value="6">Short Film</option>
              <option value="7">Feature Film</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="file" className="form-label">
              File
            </label>
            <input type="file" id="file" onChange={(e) => this.setState({ selectedFile: e.target.files[0] })} />
          </div>
          {errorTag}
          <div className="col-12">
            <button className="btn btn-primary" type="submit" onClick={this.submitForm} >
              Create File
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default UploadVideoPage;