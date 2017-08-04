import React from 'react';
import PubSub from 'pubsub-js';

class InputCustomizado extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            msgErro: ''
        }
    }
    
    componentDidMount() {
        PubSub.subscribe('erro-validacao', function(topico, erro) {
            if( erro.field === this.props.name ) {
                this.setState({
                    msgErro: erro.defaultMessage
                });
            }
        }.bind(this));
        
        PubSub.subscribe('limpa-erros', function(topico, erro) {
            this.setState({
                msgErro: ''
            });
        }.bind(this));
    }
    
    render() {
        return (
            <div className="pure-control-group">
                <label htmlFor={this.props.id}>{this.props.label}</label> 
                <input id={this.props.name} type={this.props.type} name={this.props.name} onChange={this.props.onChange} value={this.props.value}  />
                <span className="error">{this.state.msgErro}</span>
            </div>
        );
    }
};

export default InputCustomizado;