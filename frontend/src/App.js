import './App.css'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'

function App() {
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
