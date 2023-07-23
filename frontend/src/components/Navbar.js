import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


export default function Navbar() {

    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const LogOut = () => {
        localStorage.removeItem('token', "");
        navigate('/login')
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand flex-column" to="/">
                    <img src="https://cdn.icon-icons.com/icons2/2474/PNG/512/notebook_pencil_school_icon_149705.png" alt="" style={{ height: "2rem" }} /> MERA NOTEBOOK</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/about">About</a>
                        </li>
                    </ul>
                    <div className="d-flex">
                        {!token && <a href="/login" role="button" className="btn btn-primary mx-2">LogIn</a>}
                        {!token && <a href="/signup" role="button" className="btn btn-primary mx-2">SignUp</a>}
                        {token && <button onClick={() => LogOut()} className="btn btn-primary mx-2">Logout</button>}
                    </div>
                </div>
            </div>
        </nav>
    )
}
