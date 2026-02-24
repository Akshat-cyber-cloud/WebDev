import React, {useState} from 'react'
import '../style/form.scss'
import { Link } from 'react-router'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router';

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const {handleLogin, loading} = useAuth()
    const navigate = useNavigate()

    if(loading){
        return <h1>Loading...</h1>
    }

    function handleSubmit(e) {
        e.preventDefault(); 

        handleLogin(username, password)
        navigate("/")
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
                <button className='button primary-button' type='submit'>Login</button>
            </form>

            <p>Don't have an account? <Link className='toggleAuthForm' to="/register">Register</Link></p>
        </div>
    </main>
  )
}

export default Login