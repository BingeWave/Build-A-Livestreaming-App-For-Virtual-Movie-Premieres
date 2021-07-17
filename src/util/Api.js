const API = {
    listVideos : function(successCallback, errorCallback) {

        let url = this._getUrlWithApiDomain('/videos');

        url += '?distributor_id=' + this._getDistributorID();

        this._call('GET', url, null, successCallback, errorCallback)
    },
    createVideo: function (data, successCallback, errorCallback) {

        let url = this._getUrlWithApiDomain('/videos');

        data['distributor_id'] = this._getDistributorID();

        this._call('POST', url, data, successCallback, errorCallback);

    },
    getVideo: function (video_id, successCallback, errorCallback) {

        let url = this._getUrlWithApiDomain('/videos/' + video_id);

        this._call('GET', url, null, successCallback, errorCallback);

    },
    uploadVideo : function(video_id, file, successCallback, errorCallback){

        let url = this._getUrlWithApiDomain('/videos/' + video_id + '/setMainVideoFile');

        this._uploadFile(url, file, null, successCallback, errorCallback);

    },
    uploadPreview : function(video_id, file, successCallback, errorCallback){

        let url = this._getUrlWithApiDomain('/videos/' + video_id + '/setPreviewVideoFile');

        this._uploadFile(url, file, null, successCallback, errorCallback);

    },
    uploadVideoMainImage : function(video_id, file, successCallback, errorCallback){

        let url = this._getUrlWithApiDomain('/videos/' + video_id + '/setMainImage');

        this._uploadFile(url, file, null, successCallback, errorCallback);

    },
    listEvents : function(successCallback, errorCallback) {

        let url = this._getUrlWithApiDomain('/events');

        url += '?distributor_id=' + this._getDistributorID();

        this._call('GET', url, null, successCallback, errorCallback)
    },
    createEvent: function (data, successCallback, errorCallback) {

        let url = this._getUrlWithApiDomain('/events');

        data['distributor_id'] = this._getDistributorID();

        this._call('POST', url, data, successCallback, errorCallback);

    },
    getEvent: function (event_id, successCallback, errorCallback) {

        let url = this._getUrlWithApiDomain('/events/' + event_id);

        this._call('GET', url, null, successCallback, errorCallback);

    },
    
    uploadEventWatermarkImage : function(event_id, file, successCallback, errorCallback){

        let url = this._getUrlWithApiDomain('/events/' + event_id + '/setWatermarkImage');

        this._uploadFile(url, file, null, successCallback, errorCallback);

    },
    uploadEventOverlayImage : function(event_id, file, successCallback, errorCallback){

        let url = this._getUrlWithApiDomain('/events/' + event_id + '/setOverlayImage');

        this._uploadFile(url, file, null, successCallback, errorCallback);

    },
    uploadEventMainImage : function(event_id, file, successCallback, errorCallback){

        let url = this._getUrlWithApiDomain('/events/' + event_id + '/setMainImage');

        this._uploadFile(url, file, null, successCallback, errorCallback);

    },
    startStream : function(event_id,playEntireBlock, playSelectVideo, successCallback, errorCallback){

        let url = this._getUrlWithApiDomain('/events/' + event_id + '/startStream');

        let data = {};

        if(playEntireBlock){
            data['start_block'] = 1;
        }

        if(playSelectVideo){
            data['video_id'] = playSelectVideo ;
        }

        this._call('POST', url, data, successCallback, errorCallback);
    },
    stopStream : function(event_id, successCallback, errorCallback){

        let url = this._getUrlWithApiDomain('/events/' + event_id + '/stopStream');

        this._call('POST', url, null, successCallback, errorCallback);
    },
    _getUrlWithApiDomain: function (url) {
        return process.env.REACT_APP_BW_API_URL + url;
    },
    _getAuthToken: function () {
        return process.env.REACT_APP_BW_AUTH_TOKEN;
    },
    _getDistributorID : function() {
        return process.env.REACT_APP_DISTRIBUTOR_ID;
    },
    _call: function (method, url, options,successCallback, errorCallback) {

        const auth_token = this._getAuthToken();

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth_token
            },
            body: (options) ? JSON.stringify(options) : null
        }).then(function (response) {

            if (!response.ok) { 
                throw new Error(`HTTP error ${response.status}`);
            }

            return response.json();
        }).then(function (response) {
            
            if(response.status === 'success'){
                successCallback(response.data);
            } else if(response.status === 'failure'){
                errorCallback(response.errors);
            }
        });
    },
    _uploadFile : function(url, file, options, successCallback, errorCallback) {

        let formData = new FormData();

        const auth_token = this._getAuthToken();

        if(typeof options === 'object' && options !== null){

            for (const [key, value] of Object.entries(options)) {
                formData.append(key, value);
            }//end for
        }

        formData.append('file', file);

        fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': auth_token
            },
            body: formData
        }).then(function (response) {

            if (!response.ok) { 
                throw new Error(`HTTP error ${response.status}`);
            }

            return response.json();
        }).then(function (response) {
            
            if(response.status === 'success'){
                successCallback(response.data);
            } else if(response.status === 'failure'){
                errorCallback(response.errors);
            }
        });

    },

    _uploadFileChunked : function(url, file, options, successCallback, errorCallback) {
        
    }
}

export default API;