import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  return (
    <div className="p-5">
      <h1 className="text-center text-6xl">Login</h1>
      <div className="flex flex-col justify-center items-center">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border-[1px] border-black rounded-md p-1"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-[1px] border-black rounded-md p-1"
        />
        <button onClick={() => navigate('/user-home')}>Login</button>
      </div>
    </div>
  )
}

export default Login
