import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './containers/Login';
import Home from './containers/Home/Home';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <Route path="/login" component={Login}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
