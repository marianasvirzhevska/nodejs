import React, { Component } from 'react';

import Input from '../Input';
import Button from '../Button';

class Form extends Component {
    state = {
        text: ''
    };

    componentDidMount() {
        const { note } = this.props;
        if (note) {
            this.setState({ text: note.text });
        }
    }

    handleInput = ({target}) => {
        this.setState({
            text: target.value
        });
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        const { handleClose, note } = this.props;
        const { text } = this.state;

        const newNote = note
            ? { ...note, text }
            : { text };
        console.log(111, newNote)

        handleClose(newNote);
    };

    render() {
        const { text } = this.state;
        const { handleInput, handleSubmit } = this;

        return(
            <div className="backdropp">
                <div className="form">
                    <h3 className='form-subtitle'>Create note</h3>
                    <form className="login-form">
                        <Input
                            multiLine={true}
                            value={text}
                            name="text"
                            onInputChange={handleInput}
                        />
                        <Button
                            type="contained"
                            color="primary"
                            handler={handleSubmit}
                        >Create</Button>

                    </form>
                </div>
            </div>
        )
    }
}

export default Form;