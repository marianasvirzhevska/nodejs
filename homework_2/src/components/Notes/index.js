import React, { Component } from 'react';

import NoteItem from '../NoteItem';
import Button from '../Button';
import Form from '../Form';

class Notes extends Component {
    token = null;

    state = {
        loaded: false,
        notes: [],
        createForm: false
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

    closeNoteForm = (note) => {
        if (note.id) {
            this.editNote(note)
        } else {
            this.createNote(note);
        }

        this.setState({
            createForm: false,
            editedNote: null
        })
    };

    openNoteForm = (editedNote) => {
        this.setState({
            createForm: true,
            editedNote
        });
    };

    createNote = (note) => {
        const newNote = {
            ...note,
            id: Date.now()
        };
        console.log(newNote)

        const config = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.token
            },
            body: JSON.stringify(newNote),
        };

        fetch('/notes', config)
            .then(() => {
                this.setState((oldState) => {
                    return {
                        notes: [...oldState.notes, newNote]
                    }
                });
            });
    };

    editNote = (editedNote) => {
        const config = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.token
            },
            body: JSON.stringify(editedNote),
        };

        fetch('/notes', config)
            .then(() => {
                this.setState((oldState) => {
                    const newNotes = oldState.notes.map((note) => editedNote.id === note.id
                        ? editedNote
                        : note);

                    return {
                        notes: newNotes
                    }
                });
            });
    };

    render() {
        const { notes, loaded, createForm, editedNote } = this.state;
        const { deleteNote, closeNoteForm, openNoteForm } = this;

        return(
            <div className="App">
                <div className="container">
                    <h1 className="form-title">Notes</h1>
                    {
                        createForm ? (
                            <Form
                                note={editedNote}
                                handleClose={closeNoteForm}/>
                        ) : (
                            <Button
                                type="outlined"
                                color="primary"
                                handler={() => openNoteForm()}
                            >Create note</Button>
                        )
                    }
                    {
                        loaded && notes.length ? (
                          <ol className="list">
                              {
                                  notes.map((item, i) => (
                                      <NoteItem
                                          key={i}
                                          note={item}
                                          editHandler={() => openNoteForm(item)}
                                          deleteHandler={() => deleteNote(item.id)}
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