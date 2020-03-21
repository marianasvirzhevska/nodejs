import React, { Component } from 'react';
import LoginForm from './components/LoginForm';

class App extends Component {
    state = {
        response: '',
    };

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    render() {
        return (
            <div className="App">
                <div className="container">
                    <LoginForm />
                </div>
            </div>
        );
    }
}

export default App;