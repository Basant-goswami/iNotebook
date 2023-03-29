import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const Notesitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className='col-md-3 my-3'>
            <div className="card" >
                <div className="card-body">
                    <div className="d-flex align-items-center ">
                        <h5 className="card-title">{note.title}</h5>
                        <div className='del-editIcons'>
                            <i className="fa-solid fa-trash mx-2" onClick={() => { deleteNote(note._id); props.showAlert("Deleted successfully", "success"); }}></i>
                            <i className="fa-solid fa-edit mx-2" onClick={() => { updateNote(note) }}></i>
                        </div>
                    </div>
                    <p className="card-text mx-2">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Notesitem
