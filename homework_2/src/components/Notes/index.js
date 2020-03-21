import React, { Component } from 'react';

import NoteItem from '../NoteItem';

class Notes extends Component {
    token = null;

    state = {
        loaded: false,
        notes: [],
    };

    componentDidMount() {
        const token = JSON.parse(localStorage.getItem("user"));
        this.token = `jwt_token ${token.jwt_token}`;

        this.callApi()
            .then(res => this.setState({ notes: res.notes, loaded: true}))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/notes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.token
            }
        });

        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    deleteNote = async (id) => {
        const config = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.token
            },
            body: JSON.stringify({id: id}),
        };

        fetch('/notes', config)
            .then(() => {
                this.setState((oldState) => {
                    return {
                        notes: oldState.notes.filter(note => note.id !== id)
                    }
                });
            });
    };

    render() {
        const { notes, loaded } = this.state;
        const { deleteNote } = this;

        return(
            <div className="App">
                <div className="container">
                    <h1 className="form-title">Notes</h1>
                    {
                        loaded && notes.length ? (
                          <ol className="list">
                              {
                                  notes.map((item, i) => (
                                      <NoteItem
                                          key={i}
                                          note={item}
                                          handler={() => deleteNote(item.id)}
                                      />
                                  ))
                              }
                          </ol>
                        ) : (
                            <p>No notes yet</p>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default Notes;