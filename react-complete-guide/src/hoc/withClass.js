import React from 'react';

const withClass = (WrappedComponet, className) => {
    return props => (
        <div className={className}>
            <WrappedComponet {...props}/>
        </div>
    );
};

export default withClass;