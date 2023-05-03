import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import SignUp from './pages/SignUp';
import ToDo from "./pages/ToDo"
import './App.css'

function App() {
  const [loginState, setLoginState] = useState(false)
  useEffect(() =>{
    if (localStorage.getItem("name")){
      setLoginState(true)
    }
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home loginState={loginState} />} />
        <Route path='/signup' element={<SignUp loginState={loginState} />} />
        <Route path="/todo" element={<ToDo loginState={loginState} />} />
      </Routes>
    </Router>
  )
}

export default App
