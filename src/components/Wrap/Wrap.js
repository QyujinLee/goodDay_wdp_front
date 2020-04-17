import React from 'react';
import { withRouter } from 'react-router-dom';

const Wrap = ({ children, match }) => {
    return (
        <div className='wrap_app'>
            {children}
        </div>
    )
}

export default withRouter(Wrap);