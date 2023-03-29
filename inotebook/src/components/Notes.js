import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext'
import Addnotes from './Addnotes';
import Notesitem from './Notesitem';

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote} = context;
    let navigate = useNavigate();
    
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "Default" })

    useEffect(() => {
        if(localStorage.getItem("authtoken")) {
            getNotes();
        }
        else{
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null);
    const refClose = useRef(null);

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id : currentNote._id ,  etitle : currentNote.title, edescription : currentNote.description, etag : currentNote.tag})
    }
 
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleAddNotes = (e) => {
        console.log("updating the node" , note);
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        props.showAlert("Updated successfully","success");
    }
    return (
        <>
            <Addnotes showAlert={props.showAlert} />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel" style={{color:"red"}}>Modal Title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleAddNotes}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h3  style={{color:'red'}}>Your Note ..</h3>
                <div className="row ">
                    {notes.map((note) => {
                        return <Notesitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes
