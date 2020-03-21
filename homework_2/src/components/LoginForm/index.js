import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Input from '../Input';
import Button from '../Button';

class LoginForm extends Component {
    state = {
        password: '',
        email: '',
        response: '',
        error: false
    };

    handleSubmit = async e => {
        e.preventDefault();

        const { email, password } = this.state;
        const history = this.props.history;
        const user = { email, password };

        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        const body = await response.text();
        const statusCode = await response.status;

        if (statusCode === 200) {
            this.setState({ response: body, error: false });
            localStorage.setItem("user", body);
            history.push('/notes');
        } else {
            this.setState({ error: JSON.parse(body).status });
        }
    };

    handleInput = ({ target }) => {
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    };

    render() {
        const { email, password, error } = this.state;
        const { handleSubmit, handleInput } = this;

        return (
            <div className="App">
                <div className="container">
                    <div className="form-control">
                        <h3 className='form-title'>Login</h3>
                        <form className="login-form">
                            <Input
                                label="Email"
                                type="email"
                                name="email"
                                value={email}
                                onInputChange={handleInput}
                            />
                            <Input
                                label="Password"
                                type="password"
                                name="password"
                                autocomplete="current-password"
                                value={password}
                                onInputChange={handleInput}
                            />
                            { error ? <p className="error">{error}</p> : null }
                            <Button
                                color="primary"
                                type="contained"
                                handler={handleSubmit}
                            >Login</Button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(LoginForm);