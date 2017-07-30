import React from 'react';

var SubmitButton = function(props) {
    return (
        <div className="pure-control-group">
            <label>{props.label}</label>
            <button type="submit" className="pure-button pure-button-primary">{props.label}</button>
        </div>
    );
};

export default SubmitButton;