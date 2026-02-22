import React, {useState} from 'react'
import '../style/form.scss'
import { Link } from 'react-router'
import axios from 'axios'

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function handleSubmit(e) {
        e.preventDefault(); 

        axios.post("http://localhost:3000/api/auth/login", {
            username,
            password
        }, {
            withCredentials: true // For Token Setup inside Cookies
        })
        .then((res) => {
            console.log(res.data);
        })
    }

  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name='username' 
                    placeholder='Enter Your Name'
                    onInput={(e) => setUsername(e.target.value)}
                />
                <input 
                    type="password" 
                    name='password' 
                    placeholder='Enter Your Password'
                    onInput={(e) => setPassword(e.target.value)}
                />
                <button type='submit'>Login</button>
            </form>

            <p>Don't have an account? <Link className='toggleAuthForm' to="/register">Register</Link></p>
        </div>
    </main>
  )
}

export default Login