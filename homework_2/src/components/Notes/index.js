import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import NoteItem from '../NoteItem';
import Button from '../Button';
import Form from '../Form';
import * as api from '../../api/notes';

class Notes extends Component {
    token = null;

    state = {
        loaded: false,
        notes: [],
        createForm: false
    };

    componentDidMount() {
        api.getNotes()
            .then(res => this.setState({ notes: res.notes, loaded: true}))
            .catch(err => console.log(err));
    }


    deleteNote = (id) => {
        api.deleteNote(id)
            .then(() => {
                this.setState((oldState) => ({
                    notes: oldState.notes.filter(note => note.id !== id)
                }));
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

        api.createNote(newNote)
            .then(() => {
                this.setState((oldState) => ({
                    notes: [...oldState.notes, newNote]
                }));
            });
    };

    editNote = (editedNote) => {
        api.editNote(editedNote)
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

    logout = () => {
        const history = this.props.history;

        localStorage.removeItem("user");
        history.push('/');
    };

    render() {
        const { notes, loaded, createForm, editedNote } = this.state;
        const { deleteNote, closeNoteForm, openNoteForm, logout } = this;

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
                    <Button
                        type="outlined"
                        color="danger"
                        handler={logout}
                    >Logout</Button>
                </div>
            </div>
        )
    }
}

export default withRouter(Notes);