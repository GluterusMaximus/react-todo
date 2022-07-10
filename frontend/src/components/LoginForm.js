import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../actions/userActions'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const { loading, error } = user

  return (
    <div>
      <h1>Sign in</h1>
      {error && <div>ERROR: {error}</div>}
      {loading && <div>Loading...</div>}
      <input
        type="email"
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        value={email}
      />
      <input
        type="password"
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        value={password}
      />
      <button
        onClick={() => dispatch(userActions.login(email, password))}
        disabled={loading}
      >
        Sign in
      </button>
    </div>
  )
}

export default LoginForm
