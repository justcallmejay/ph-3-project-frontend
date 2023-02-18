import React from 'react';

function Error( { error, toggleError } ) {

    return (
            <div className="error-msg">
                <div className="error-msg-container">
                    <div className="error">
                        <div className="error-quote">Error: {error}</div>
                    </div>
                        <div className="error-btn-container">
                            <button className='error-btn' onClick={toggleError}>Ok</button>
                        </div>
                </div>
            </div>
    )
}

export default Error;