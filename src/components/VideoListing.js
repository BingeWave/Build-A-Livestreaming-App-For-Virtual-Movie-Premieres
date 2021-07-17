import React from 'react';

import API from '../util/Api';

const VideoListing = (props) => {
    
    let updateURL = '/videos/update/' + props.video.id;

    let imageUrl = (props.video.image_medium_sq_url) ? props.video.image_medium_sq_url : 'https://via.placeholder.com/150';

    let actionTag = null

    if(props.mode && props.mode === 'player'){
        actionTag = <button className="btn btn-success" onClick={playFilm} >Play</button>
    } else {
        actionTag = <a className="btn btn-info" href={updateURL} >Update</a>
    }

    let processsingState = null;
    
    switch(parseInt(props.video.video_processing_state)) {
        case 0:
            processsingState = <span className="badge bg-info">Awaiting Processing</span>
          break;
        case 1:
            processsingState = <span className="badge bg-warning">Being Processed</span>
            break;
        case 2:
            processsingState = <span className="badge bg-success">Finished Processing</span>
            break;
        case 3:
            processsingState = <span className="badge bg-danger">Failed Processing</span>
            break;
        default:
            processsingState = <span className="badge bg-default">Unknown</span>
      }

    function playFilm(){
        API.startStream(props.event.id, false, props.video.id, function(data){
            alert("Film sent to play");
        }, function(errors){

        });
    }

    return (
      <div className="row mt-1 mb-3">
          <div className="col-sm-2">
            <img className="img-fluid" alt="A Video" src={imageUrl} />
          </div>
          <div className="col-sm-6">
            <h3>{props.video.title}</h3>
            <div dangerouslySetInnerHTML={{__html:props.video.description}} />
            
          </div>

          <div className="col-sm-2">
            {processsingState}
          </div>

          <div className="col-sm-2">
                {actionTag}
          </div>
          
      </div>
    );
    
    }
    
export default VideoListing;