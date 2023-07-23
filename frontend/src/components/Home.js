import React, { useEffect, useContext } from 'react'
import Note from './Note'
import AddNote from './AddNote'
import NoteContext from '../context/notes/notesContext';
import { useNavigate } from 'react-router-dom';

export default function Home(props) {

    const navigate = useNavigate();
    const context = useContext(NoteContext);
    const { getAllNotes } = context;

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getAllNotes();
        } else {
            navigate('/login')
        }
    }, [])

    return (
        <div>
            <AddNote />

            <div className='container my-3'>
                <h2>Your Notes</h2>
                <Note showAlert={props.showAlert} />
            </div>
        </div >
    )
}
