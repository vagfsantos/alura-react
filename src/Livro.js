import React, {Component} from 'react';
import $ from 'jquery';
import InputCustomizado from './components/InputCustomizado';
import SubmitButton from './components/SubmitButton';
import PubSub from 'pubsub-js';
import TratadorErrors from './TratadorErrors';

class FormularioLivro extends Component{
    constructor(){
        super();
        this.state = {
            titulo: '',
            preco: '',
            autorId: ''
        };
        this.enviaForm = this.enviaForm.bind(this);
        this.setTitulo = this.setTitulo.bind(this);
        this.setPreco = this.setPreco.bind(this);
        this.setAutorId = this.setAutorId.bind(this);
    }
    
    enviaForm(evento) {
        evento.preventDefault();
        console.log('enviando form');
        
        $.ajax('http://localhost:8080/api/livros', {
            dataType: 'json',
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify({
                titulo: this.state.titulo,
                preco: this.state.preco,
                autorId: this.state.autorId
            }),
            success: novaListagem => {
                PubSub.publish('atualiza-lista-livros', novaListagem);
                this.setState({
                    titulo:'',
                    preco:'',
                    autorId:''
                });
            },
            error: error => {
                console.log(error)
                
                if( error.status === 400 ) {
                    new TratadorErrors().publicaErros(error.responseJSON);
                }
            },
            
            beforeSend: () => {
                PubSub.publish('limpa-erros');
            }
        });
    }
    
    setTitulo(evento) {
        this.setState({
            titulo: evento.target.value
        });
    }
    
    setPreco(evento) {
        this.setState({
            preco: evento.target.value
        });
    }
    
    setAutorId(evento) {
        this.setState({
            autorId: evento.target.value
        });
    }
    
    render() {
        return(
            <div className="pure-form pure-form-aligned">
                <form onSubmit={this.enviaForm} method="post" className="pure-form pure-form-aligned">
                    <InputCustomizado id="titulo" type="text" name="titulo" label="titulo" onChange={this.setTitulo} value={this.state.titulo}/>

                    <InputCustomizado id="preco" type="text" name="preco" label="preco" onChange={this.setPreco} value={this.state.preco}/>
                    
                    <div className="pure-control-group">
                        <label htmlFor="autorId">Autor</label> 
                        <select value={this.state.autorId} id="autorId" name="autorId" onChange={this.setAutorId}>
                            <option value="">Selecione o Autor</option>
                            {
                                this.props.autores.map( autor => <option value={autor.id}>{autor.nome}</option>)
                            }
                        </select>
                    </div>

                    <SubmitButton label="Gravar" />
                </form>
            </div>
        );
    }
}

class TabelaLivros extends Component{
    constructor(){
        super();
    }
    
    render() {
        return (
            <div>            
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Preco</th>
                            <th>Autor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.lista.map( (livro) => {
                                return (
                                    <tr key={livro.id}>
                                        <td>{livro.titulo}</td>
                                        <td>{livro.preco}</td>
                                        <td>{livro.autor.nome}</td>
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

export default class LivroBox extends Component {
    constructor() {
        super();
        this.state = {
            lista: [],
            autores:[]
        }
    }
    
    componentDidMount() {
        $.ajax('http://localhost:8080/api/livros', {
            dataType: 'json',
            success: function(listagem){
                PubSub.publish('atualiza-lista-livros', listagem);
            }
        });
        
        $.ajax('http://localhost:8080/api/autores', {
            dataType: 'json',
            success: function(listagem){
                PubSub.publish('atualiza-lista-autores', listagem);
            }
        });
        
        PubSub.subscribe('atualiza-lista-livros', function(topico, novaListagem){
            this.setState({
                lista: novaListagem
            });
        }.bind(this));
        
        PubSub.subscribe('atualiza-lista-autores', function(topico, novaListagem){
            this.setState({
                autores: novaListagem
            });
        }.bind(this));
    }
    
    render() {
        return(
            <div>
                <div className="header">
                    <h1>Cadastro de Livros</h1>
                </div>
                <div className="content" id="content">
                    <FormularioLivro autores={this.state.autores}/>
                    <TabelaLivros lista={this.state.lista}/>
                </div>
            </div>
        );
    }
}