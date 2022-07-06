import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../actions/userActions'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import UserService from '../services/userService'

const HomeScreen = () => {
  const { userData, authenticated } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const [users, setUsers] = useState([])

  const getUsers = async () => {
    try {
      const response = await UserService.fetchUsers()
      setUsers(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {authenticated ? (
        <>
          User {userData.email}
          {userData.isActivated ? (
            <h2>Account activated</h2>
          ) : (
            <h1>Activate your account!</h1>
          )}
          <button onClick={() => dispatch(userActions.logout())}>Logout</button>
        </>
      ) : (
        <>
          Please sign in
          <LoginForm />
          <RegisterForm />
        </>
      )}
      <button onClick={getUsers}>Get Users</button>
      {users.map(user => (
        <div key={user.id}>{user.email}</div>
      ))}
    </div>
  )
}

export default HomeScreen
