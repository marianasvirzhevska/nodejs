import React from "react";
import Button from '../Button';

const NoteItem = ({ note, deleteHandler, editHandler }) => {

    return (
        <li className="list-item">
            <div className="item-wrap">
                <div className="info">{note.text}</div>
                <div className="actions">
                    <Button
                        size="small"
                        type="outlined"
                        color="secondary"
                        handler={editHandler}
                    >Edit</Button>
                    <Button
                        size="small"
                        type="contained"
                        color="danger"
                        handler={deleteHandler}
                    >Delete</Button>
                </div>
            </div>
        </li>
    )
};

export default NoteItem;