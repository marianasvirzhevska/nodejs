import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { PrivateRoute } from './components/PrivateRoute';
import NotFound from './components/NotFound';
import LoginForm from './components/LoginForm';
import Notes from './components/Notes';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={LoginForm}/>
                <PrivateRoute exact path="/notes" component={Notes}/>
                <Route path="*" component={NotFound}/>
            </Switch>
        </Router>
    )
};

export default App;