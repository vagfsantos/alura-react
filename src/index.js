import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AutorBox from './Autor';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';

ReactDOM.render(
    (
        <Router>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/autor" component={AutorBox} />
            </Switch>
        </Router>
    ),
    document.getElementById('root')
);