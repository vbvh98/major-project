import React, { useState, useRef } from 'react'
import { Redirect } from 'react-router-dom'

const Login = () => {
  const [goto, setGoto] = useState('current')
  const [err, setErr] = useState('no Error')
  const [users] = useState([
    { username: 'admin', password: 'admin' },
    { username: 'patientA', password: 'testaccess' },
  ])
  const nameRef = useRef(0)
  const passwordRef = useRef(0)
  const checkUser = () => {
    const user = users.findIndex({
      username: nameRef.current.value,
      password: passwordRef.current.value,
    })
    if (user === -1) setErr('Invalid User Account!')
    if (user === 0) setGoto('/Doctor')
    else setGoto('/App')
  }

  return goto === 'current' ? (
    <div>
      <div className='error'>{err !== 'no Error' && err}</div>
      <label>
        Username: <input type='text' ref={nameRef} />
      </label>
      <label>
        Password: <input type='password' ref={passwordRef} />
      </label>
      <button onClick={checkUser}>LogIn</button>
    </div>
  ) : (
    <Redirect to={goto} />
  )
}

export default Login
