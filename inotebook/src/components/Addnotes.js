import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const Addnotes = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({title:"", description:"", tag:"Default"})

    const onChange = (e) => {
        setNote({...note, [e.target.name] : e.target.value})
    }

    const handleAddNotes = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        props.showAlert("Added successfully","success");
    }

    return (
        <>
            <div>
                <h2 className='text-center'  style={{fontFamily :"initial"}}>Welcome to the iNotebook</h2>
                <h5  style={{color : "red"}} >Add a Note</h5>
                <div className="container my-3">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <input type="text" className="form-control" id="description" name="description" onChange={onChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tag" className="form-label">Tag</label>
                            <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={handleAddNotes}>Add Note</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Addnotes
