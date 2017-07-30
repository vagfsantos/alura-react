import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomizado from './components/InputCustomizado';
import SubmitButton from './components/SubmitButton';
import './css/pure-min.css';
import './css/side-menu.css';

class App extends Component {
    constructor(){
        super();
        this.state = {
            lista: [],
            nome: '',
            email: '',
            senha: ''
        };
        this.enviaForm = this.enviaForm.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
    }

    componentDidMount() {
        $.ajax('http://localhost:8080/api/autores', {
            dataType: 'json',
            success: function(data){
                this.setState({
                    lista: data
                });
            }.bind(this)
        });
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
            success: data => {
                this.setState({
                    lista: data
                });
            },
            error: error => {
                console.log(error)
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
        return (
            <div id="layout">

                <a href="#menu" id="menuLink" className="menu-link">

                    <span></span>
                </a>

                <div id="menu">
                    <div className="pure-menu">
                        <a className="pure-menu-heading" href="#">Company</a>

                        <ul className="pure-menu-list">
                            <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
                            <li className="pure-menu-item"><a href="#" className="pure-menu-link">Autor</a></li>
                            <li className="pure-menu-item"><a href="#" className="pure-menu-link">Livro</a></li>
                        </ul>
                    </div>
                </div>

                <div id="main">
                    <div className="header">
                        <h1>Cadastro de Autores</h1>
                    </div>
                    <div className="content" id="content">
                        <div className="pure-form pure-form-aligned">
                            <form onSubmit={this.enviaForm} method="post" className="pure-form pure-form-aligned">
                                <InputCustomizado id="nome" type="text" name="nome" label="Nome" onChange={this.setNome} value={this.state.nome}/>
                                
                                <InputCustomizado id="email" type="email" name="email" label="E-mail" onChange={this.setEmail} value={this.state.email}/>
                                
                                <InputCustomizado id="password" type="password" name="senha" label="Senha" onChange={this.setSenha} value={this.state.senha}/>
                       
                                <SubmitButton label="Gravar" />
                            </form>             

                        </div>  
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
                                        this.state.lista.map( (autor) => {
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
                    </div>
                </div>            
            </div>     
        );
    }
}

export default App;
