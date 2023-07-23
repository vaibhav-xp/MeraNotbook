import NoteContext from './notesContext'
import { useState } from 'react'

const NoteState = (props) => {

    const authToken = localStorage.getItem('token');

    const host = "http://localhost:5000"
    const [notes, setNotes] = useState([])

    // Get all note 
    const getAllNotes = async() => {
        // API Call 
        const url = `${host}/notes/fetchallnotes`
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": authToken
            },
        })
        const json = await response.json()
        setNotes(json)
    }

    // Add a note 
    const addNote = async (title, description, tag) => {
        // TODO: API Call
        // API Call 
        const response = await fetch(`${host}/notes/addnotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": authToken
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        if (note.user) {
            setNotes(notes.concat(note))
        }
    }

    // Delete a note 
    const deleteNote = async(_id) => {
        // API Call 
        const url = `${host}/notes/deletenotes/${_id}`
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": authToken
            },
        })

        const newNotes = notes.filter((note) => { return note._id !== _id })
        setNotes(newNotes)
    }

    // Edit a note 
    const editNote = async (_id, title, description, tag) => {
        // API Call 
        const url = `${host}/notes/updatenotes/${_id}`
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": authToken
            },
            body: JSON.stringify({title, description, tag})
        })
        const updatedNote = await response.json();
        // Update the notes array with the edited note
        setNotes(notes.map(note => (note._id === _id ? updatedNote : note)));
    }


    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState