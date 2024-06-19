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
                    <div className="d-flex flex-row-reverse w-100 sm-p-4 ">
                        {!token && <Link to="/login" role="button" className="btn btn-primary mx-2">LogIn</Link>}
                        {!token && <Link to="/signup" role="button" className="btn btn-primary mx-2">SignUp</Link>}
                        {token && <button onClick={() => LogOut()} className="btn btn-primary mx-2">Logout</button>}
                    </div>
                </div>
            </div>
        </nav>
    )
}
