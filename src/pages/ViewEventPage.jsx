import React from 'react';

import API from '../util/Api';

import { withRouter } from "react-router";

import Errors from '../components/errors';

import VideoListing from '../components/VideoListing';

import { appendScript } from '../util/appendScript';

import { removeScript } from '../util/removeScript';



class ViewEventPage extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      event: {},
    };

    this.handleStartStream = this.handleStartStream.bind(this);
    this.handleStopStream = this.handleStopStream.bind(this);

  }


  componentDidMount() {

    appendScript("https://connect.bingewave.com/connect.js");

    const id = this.props.match.params.id;

    let that = this;

    API.getEvent(id, function (data) {

      that.setState({ event: data }, () => {
        
        //ensures the widgets load after the state is set
        if(window.BingewaveConnector){
          window.BingewaveConnector.init();
        } else {
          setTimeout(() => {
            window.BingewaveConnector.init();
          }, 3000);
        }
    });

    }, function (errors) {
      that.setState({ errors: errors });
    });
  }

  componentWillUnmount() {
    removeScript("https://connect.bingewave.com/connect.js")
  }

  handleStartStream(playEntireBlock, playSelectVideo) {

    let that = this;

    API.startStream(this.state.event.id, playEntireBlock, playSelectVideo, function (data) {
      alert("Stream successfully started");
    }, function (errors) {
      that.setState({ errors: errors });
    });
  }

  handleStopStream() {

    let that = this;

    API.stopStream(this.state.event.id, function (data) {
      alert("Message sent to stop stream");
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

    let filmTag = null
    let playTag = null;

    if (Object.keys(this.state.event).length > 0 && this.state.event.pre_recorded_contents.length > 0) {

      let that = this;

      filmTag = this.state.event.pre_recorded_contents.map(function (video, index) {
        return <VideoListing video={video} event={that.state.event} key={index} mode={"player"}/>
      });

      playTag = <button className="btn btn-success" onClick={() => this.handleStartStream(true)} >Play Entire Block</button>

    } else if(Object.keys(this.state.event).length > 0) {
      filmTag = <VideoListing video={this.state.event.pre_recorded_content} />
      playTag = <button className="btn btn-success" onClick={() => this.handleStartStream(false)} >Start Stream</button>
    }

    return (
      <div className="container mt-2">
        <h3>{this.state.event.title}</h3>

        <div className="text-center mb-3">
          {playTag}
          -
          <button className="btn btn-danger" onClick={this.handleStopStream}>Stop Stream</button>
        </div>

        <div>
          {errorTag}
        </div>

        <div dangerouslySetInnerHTML={{ __html: this.state.event.embed_livestream }} />

        {filmTag}
      </div>
    );
  }
}

export default withRouter(ViewEventPage);