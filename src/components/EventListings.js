import React from 'react';


const EventListings = (props) => {

    let viewUrl = '/screenings/view/' + props.event.id;
    let editUrl = '/screenings/update/' + props.event.id;

    let imageUrl = (props.event.image_medium_sq_url) ? props.event.image_medium_sq_url : 'https://via.placeholder.com/150';

    return (
    <div className="col">
        <div className="card shadow-sm">
        <img className="img-fluid" alt="An Event" src={imageUrl} />

        <div className="card-body">
            <h3>{props.event.title}</h3>
            <p className="card-text" dangerouslySetInnerHTML={{__html:props.event.description}}></p>
            <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
                <a href={viewUrl} className="btn btn-sm btn-outline-secondary">View</a>
                <a href={editUrl} className="btn btn-sm btn-outline-secondary">Edit</a>
            </div>
            <small className="text-muted">{props.event.date}</small>
            </div>
        </div>
        </div>
    </div>
  );

}

export default EventListings;