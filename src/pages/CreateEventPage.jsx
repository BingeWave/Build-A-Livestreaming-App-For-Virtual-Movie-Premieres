import React from 'react';

import API from '../util/Api';

import DateTimePicker from 'react-datetime-picker';

import Select from 'react-select';

import Errors from '../components/errors';

class CreateEventPage extends React.Component {

  constructor(props) {
   
    super(props);

    this.submitForm = this.submitForm.bind(this);
    this.handleMultiSelect = this.handleMultiSelect.bind(this);

    this.state = {
      event_title : '',
      event_description : '',
      type : 0,
      films : [],
      videos : [],
      videosOptions : [],
      video_id : null,
      is_virtual_event : 1,
      requested_date_1 : null,
      auto_start : 1,
      errors : null,
    };

    let that = this;

    API.listVideos(function(data){

      let options = [];
      
      data.forEach(video => {
        options.push({value: video.id, label: video.title});
      });

      that.setState({videos : data, videosOptions : options});
    }, function(errors){

    });
  }

  handleMultiSelect(selectedOptions) {

    let options = [];

    selectedOptions.forEach(option => {
      options.push(option.value);
    });

    this.setState({video_id: null,videos: options });
  }

  submitForm() {

    let that = this;
    
    API.createEvent(this.state, function(data){

      alert("Event successfully created");

    }, function(errors){
      that.setState({errors: errors});
    });
  }

  render() {

    let videoOptionTag = <Select options={this.state.videosOptions} isMulti={false} onChange={(selectedOption) => this.setState({ video_id: selectedOption.value })}  />;

    let videoOptionLabel = 'Select A Single Film';

    if(this.state.type === 4){
      videoOptionTag = <Select options={this.state.videosOptions} isMulti={true} onChange={this.handleMultiSelect} />;
      videoOptionLabel = 'Select Multiple Films';
    }

     

    const hasErrors = this.state.errors;

    let errorTag;

    if (hasErrors) {
      errorTag = <Errors errors={this.state.errors} />;
    } else {
      errorTag = '';
    }

    return (
      <div className="container mt-3">
        <h2 className="text-center">Create a Screening</h2>
        <div>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input type="text" className="form-control" id="title" onChange={(e) => this.setState({ event_title: e.target.value })} />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea type="text" className="form-control" id="description" rows="3" onChange={(e) => this.setState({ event_description: e.target.value })}  ></textarea>
          </div>


          <div className="mb-3">
           <label htmlFor="description" className="form-label">{videoOptionLabel}</label>

            {videoOptionTag}

          </div>

          <div className="mb-3">
            <label  className="form-label">
              Date/Time
            </label>
            <DateTimePicker  onChange={(date) => this.setState({ requested_date_1 : date })}  />
          </div>

          <div className="mb-3">
            <label htmlFor="type" className="form-label">
              Event type
            </label>
            <select className="form-control" id="type" onChange={(e) => this.setState({ type: e.target.value })} >
              <option value="">Select Event Type</option>
              <option value="1">Single Film</option>
              <option value="4">Multiple Films</option>
              
            </select>
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

export default CreateEventPage;