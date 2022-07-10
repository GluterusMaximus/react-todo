import './App.css'
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import { userActions } from './actions/userActions'
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(userActions.checkAuth())
    }
  }, [])

  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<HomeScreen />}></Route>
        </Routes>
      </main>
    </Router>
  )
}

export default App
