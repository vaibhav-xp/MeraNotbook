import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../context/notes/NoteState'

export default function Signup(props) {
  const { showAlert } = props
  let navigate = useNavigate()
  const [credential, setCredential] = useState({ name: "", email: "", password: '', cpassword: "" })

  const handleOnChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credential.password !== credential.cpassword) {
      return props.showAlert("Password Doesn't Match", "warning")
    } else {
      const url = `${BASE_URL}/users/create-user`
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: credential.name, email: credential.email, password: credential.password })
      })
      const json = await response.json();
      if (json.authToken) {
        localStorage.setItem('token', json.authToken);
        navigate("/");
        showAlert("Account Created Successfully", "success")
      } else {
        showAlert("Invalide Credentials", "danger")
      }
    }

  }

  return (
    <form className='container' onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Name</label>
        <input type="name" name="name" value={credential.name} onChange={handleOnChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Name" />
        <label htmlFor="exampleInputEmail2">Email address</label>
        <input type="email" name="email" value={credential.email} onChange={handleOnChange} className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="Enter email" />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input type="password" name="password" value={credential.password} onChange={handleOnChange} className="form-control" id="exampleInputPassword1" placeholder="Password" />
        <label htmlFor="exampleInputPassword2">Confirm Password</label>
        <input type="cpassword" name="cpassword" value={credential.cpassword} onChange={handleOnChange} className="form-control" id="exampleInputPassword2" placeholder="Confirm Password" />
      </div>
      <button type="submit" className="btn btn-primary mt-2">Submit</button>
    </form>
  )
}
