import React from 'react';

import EventListngs from '../components/EventListings';

import API from '../util/Api';

class ListEventsPage extends React.Component {

  constructor(props) {
   
    super(props);

    this.state = {
      events : [],
    };

    
  }

  componentDidMount() {

    let that = this;

    API.listEvents(function(data){
        that.setState({events : data});
    }, function(errors){

    });
  }

    render() {
      return (
      <div className="container mt-2">

        <h2>My Screenings</h2>

        <a className="btn btn-success" href="/screenings/create">Create Screening</a>

        <hr />

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

          {this.state.events.map(function (event, index) {
            return <EventListngs event={event} key={index} />
          })}

          </div>

      </div>
      );
    }
  }

  export default ListEventsPage;