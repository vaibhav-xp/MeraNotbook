import React, { useState, useRef } from 'react'
import { useContext } from 'react'
import NoteContext from '../context/notes/notesContext'
import NoteItem from './NoteItem.js'

export default function Note(props) {
    const context = useContext(NoteContext);
    const { editNote, notes } = context;
    const [noteUpdate, setUdpateNotes] = useState({ title: "", description: "", tag: "" })

    const ref = useRef(null)
    const updateNote = (currentNote) => {
        setUdpateNotes(currentNote)
        ref.current.click()
    }

    const handleClick = (e) => {
        e.preventDefault();
        editNote(noteUpdate._id, noteUpdate.title, noteUpdate.description, noteUpdate.tag);
        props.showAlert("Updated Successfully", "success")
        ref.current.click()
    }

    const onChange = (e) => {
        setUdpateNotes({ ...noteUpdate, [e.target.name]: e.target.value })
    }

    console.log(notes)

    return (
        // Edit Note 
        <div className='row my-3'>
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">
                Edit Notes
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <form className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input minLength={5} required type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp"
                                    value={noteUpdate.title} onChange={onChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <input minLength={5} required type="text" value={noteUpdate.description} className="form-control" id="description" name="description" onChange={onChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label">Tags</label>
                                <input minLength={5} type="text" className="form-control" value={noteUpdate.tag} id="tag" name="tag" onChange={onChange} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={noteUpdate.title.length < 5 || noteUpdate.description.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Now</button>
                        </div>
                    </form>
                </div>
            </div>
            {notes.length === 0 && <div className='container'>Not notes to display</div>}
            {
                notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                })
            }
        </div>
    )
}
