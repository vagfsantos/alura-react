import React from 'react';

var InputCustomizado = function(props){
    return (
        <div className="pure-control-group">
            <label htmlFor={props.id}>{props.label}</label> 
            <input id={props.name} type={props.type} name={props.name} onChange={props.onChange} value={props.value}  />
        </div>
    );
};

export default InputCustomizado;