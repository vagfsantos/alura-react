import React, {Component} from 'react';
import $ from 'jquery';
import InputCustomizado from './components/InputCustomizado';
import SubmitButton from './components/SubmitButton';
import PubSub from 'pubsub-js';
import TratadorErrors from './TratadorErrors';

class FormularioAutor extends Component{
    constructor(){
        super();
        this.state = {
            nome: '',
            email: '',
            senha: ''
        };
        this.enviaForm = this.enviaForm.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
    }
    
    enviaForm(evento) {
        evento.preventDefault();
        console.log('enviando form');
        
        $.ajax('http://localhost:8080/api/autores', {
            dataType: 'json',
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify({
                nome: this.state.nome,
                email: this.state.email,
                senha: this.state.senha
            }),
            success: novaListagem => {
                PubSub.publish('atualiza-lista-autores', novaListagem);
            },
            error: error => {
                console.log(error)
                
                if( error.status === 400 ) {
                    new TratadorErrors().publicaErros(error.responseJSON);
                }
            }
        });
    }
    
    setNome(evento) {
        this.setState({
            nome: evento.target.value
        });
    }
    
    setEmail(evento) {
        this.setState({
            email: evento.target.value
        });
    }
    
    setSenha(evento) {
        this.setState({
            senha: evento.target.value
        });
    }
    
    render() {
        return(
            <div className="pure-form pure-form-aligned">
                <form onSubmit={this.enviaForm} method="post" className="pure-form pure-form-aligned">
                    <InputCustomizado id="nome" type="text" name="nome" label="Nome" onChange={this.setNome} value={this.state.nome}/>

                    <InputCustomizado id="email" type="email" name="email" label="E-mail" onChange={this.setEmail} value={this.state.email}/>

                    <InputCustomizado id="password" type="password" name="senha" label="Senha" onChange={this.setSenha} value={this.state.senha}/>

                    <SubmitButton label="Gravar" />
                </form>
            </div>
        );
    }
}

class TabelaAutores extends Component{
    constructor(){
        super();
    }
    
    render() {
        return (
            <div>            
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.lista.map( (autor) => {
                                return (
                                    <tr key={autor.id}>
                                        <td>{autor.nome}</td>
                                        <td>{autor.email}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default class AutorBox extends Component {
    constructor() {
        super();
        this.state = {
            lista: []
        };
    }
    
    componentDidMount() {
        $.ajax('http://localhost:8080/api/autores', {
            dataType: 'json',
            success: function(listagem){
                PubSub.publish('atualiza-lista-autores', listagem);
            }
        });
        
        PubSub.subscribe('atualiza-lista-autores', function(topico, novaListagem){
            this.setState({
                lista: novaListagem
            });
        }.bind(this));
    }
    
    render() {
        return(
            <div>
                <FormularioAutor />
                <TabelaAutores lista={this.state.lista}/>
            </div>
        );
    }
}