import React from 'react';

function Error( { error, toggleError } ) {
    
    return (
            <div className="error-msg">
                <div className="error-msg-container">
                    <div className="error">
                        <div>Error: {error}</div>
                        <button onClick={toggleError}>Ok</button>
                    </div>
                </div>
            </div>
    )
}

export default Error;