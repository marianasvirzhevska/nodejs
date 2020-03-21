import React from "react";
import Button from '../Button';

const NoteItem = ({ note, handler }) => {

    return (
        <li className="list-item">
            <div className="item-wrap">
                <div className="info">{note.text}</div>
                <div className="actions">
                    <Button
                        size="small"
                        type="contained"
                        color="danger"
                        handler={handler}
                    >Delete</Button>
                </div>
            </div>
        </li>
    )
};

export default NoteItem;