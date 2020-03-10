import React from 'react';

const validator = (props) => {

    let message = 'Text too long';

    if (props.longString <= 5)
        message = 'Text too short'

    return (
        <p>{message}</p>
    )
};

export default validator;