import React from 'react';

import API from '../util/Api';

import VideoListing from '../components/VideoListing';

class ListVideosPage extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      videos: [],
    };
    
  }

  componentDidMount() {

    let that = this;

    API.listVideos(function (data) {
      that.setState({ videos: data });
    }, function (errors) {

    });
  }

  render() {
    return (
      <div className="container mt-2">
        <h1>Uploaded Videos</h1>

        <a className="btn btn-success" href="/upload">Upload Video</a>

        <hr />

        <div className="card card-body bg-light pb-0">
          <div className="row">
            <div className="col-sm-2">
              <p>Image</p>
            </div>
            <div className="col-sm-6">
              <p>Info</p>

            </div>

            <div className="col-sm-2">
              Processing State
            </div>

            <div className="col-sm-2">
              Update
            </div>

          </div>
        </div>
        {this.state.videos.map(function (video, index) {

          return (<VideoListing video={video} key={index} />);

        })}
      </div>
    );
  }
}

export default ListVideosPage;