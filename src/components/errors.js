import React from 'react';


const Errors = (props) => {

    let messages = [];

    if (props.errors) {

        if (typeof props.errors === 'object' && props.errors !== null) {
            for (let [key, value] of Object.entries(props.errors)) {

                if (typeof value === 'object' && value !== null) {

                    for (let [key2, value2] of Object.entries(value)) {
                        messages.push(value2);
                    }//end for

                } else {
                    messages.push(value);
                }

            }//end for

        } else if (Array.isArray(typeof props.errors)) {
            props.errors.array.forEach(element => {
                messages.push(element);
            });
        } else if (typeof props.errors === 'string') {
            messages.push(props.errors);
        }
    }

    return <div>
        {messages.map(function (name, index) {
            return <div className="alert alert-danger" key={index}>{name}</div>
        })}
    </div>
}

export default Errors;