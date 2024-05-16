import React, { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3 className="text-center font-bold text-green-500 text-2xl">Log In</h3>
      
      <label className="text-black-900 text-xl">Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label className="text-black-900 text-xl">Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      {error && <div className="error">{error}</div>}
      <button disabled={isLoading} className="mt-5">Log in</button>
      <Link  to = "/adminLogin" >
      <p className="mt-3">Login as Admin</p>
      </Link>

    </form>
  )
}

export default Login