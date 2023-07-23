import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/notesContext"

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [notes, setNotes] = useState({ title: "", description: "", tag: "default" })

    const handleClick = (e) => {
        e.preventDefault();
        addNote(notes.title, notes.description, notes.tag);
        setNotes({ title: "", description: "", tag: "" })
    }

    const onChange = (e) => {
        setNotes({ ...notes, [e.target.name]: e.target.value })
    }
    return ( 
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input minLength={5} required type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input minLength={5} required type="text" className="form-control" id="description" name="description" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tags" className="form-label">Tags</label>
                    <input minLength={5} type="text" className="form-control" id="tags" name="tags" onChange={onChange} />
                </div>
                <button disabled={notes.title.length < 5 || notes.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote