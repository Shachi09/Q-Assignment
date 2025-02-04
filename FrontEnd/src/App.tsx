import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUp from './components/SignUp';
import Login from './components/Login';
import AllPaintingsList from './components/Paintings/AllPaintingsList';
import AddPaintingForm from './components/Paintings/AddPaintingForm';
import EditPaintingForm from './components/Paintings/EditPaintingForm';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
          <ToastContainer />
          <Routes>
          <Route path="/register-user" element={<SignUp />}></Route>
          <Route path="/login-user" element={<Login />}></Route>
          <Route path="/" element={<AllPaintingsList />}></Route>
          <Route path="/add-painting" element={<AddPaintingForm />}></Route>
          <Route path="/edit-painting" element={<EditPaintingForm />}></Route>
          </Routes>
      </Router>
    </>
  )
}

export default App
