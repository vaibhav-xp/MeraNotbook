import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../context/notes/NoteState'

export default function Login(props) {

    let navigate = useNavigate()
    const [credential, setCredential] = useState({ email: "", password: '' })

    const handleOnChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `${BASE_URL}/users/login`
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        })
        const json = await response.json();
        if (json.authToken) {
            localStorage.setItem('token', json.authToken);
            navigate("/");
            props.showAlert("Loged In Successfully", "success")
        } else {
            props.showAlert("Invalide Details", "danger")
        }
    }

    return (
        <form className='container' onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" name="email" value={credential.email} onChange={handleOnChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" name="password" value={credential.password} onChange={handleOnChange} className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary mt-2">Submit</button>
        </form>
    )
}
