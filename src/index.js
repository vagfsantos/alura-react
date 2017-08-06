import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AutorBox from './Autor';
import Home from './Home';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';

ReactDOM.render(
    (
        <Router>
            <App>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/autor" component={AutorBox} />
                    <Route path="/livro" />
                </Switch>
            </App>
        </Router>
    ),
    document.getElementById('root')
);