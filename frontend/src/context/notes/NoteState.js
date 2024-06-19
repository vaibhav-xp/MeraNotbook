import NoteContext from './notesContext'
import { useState } from 'react'

export const BASE_URL = process.env.REACT_APP_BASE_URL;

const NoteState = (props) => {

    const authToken = localStorage.getItem('token');

    const [notes, setNotes] = useState([])

    // Get all note 
    const getAllNotes = async () => {
        // API Call 
        try {
            const url = `${BASE_URL}/notes/fetchallnotes`
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken
                },
            })
            const json = await response.json()
            setNotes(json.error ? [] : json);
        } catch (error) {
            console.error(error.message);
        }
    }

    // Add a note 
    const addNote = async (title, description, tag) => {
        // TODO: API Call
        // API Call 
        try {
            const response = await fetch(`${BASE_URL}/notes/addnotes`, {
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
        } catch (error) {
            console.error(error.message);
        }
    }

    // Delete a note 
    const deleteNote = async (_id) => {
        // API Call 
        try {
            const url = `${BASE_URL}/notes/deletenotes/${_id}`
            await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken
                },
            })

            const newNotes = notes.filter((note) => { return note._id !== _id })
            setNotes(newNotes)
        } catch (error) {
            console.error(error.message);
        }
    }

    // Edit a note 
    const editNote = async (_id, title, description, tag) => {
        // API Call 
        try {
            const url = `${BASE_URL}/notes/updatenotes/${_id}`
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken
                },
                body: JSON.stringify({ title, description, tag })
            })
            const updatedNote = await response.json();
            // Update the notes array with the edited note
            setNotes(notes.map(note => (note._id === _id ? updatedNote : note)));
        } catch (error) {
            console.error(error.message);
        }
    }


    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState