import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Screens/Home'
import CreateUser from './Screens/CreateUser'
import EditUser from './Screens/EditUser'
import { Bounce, ToastContainer } from 'react-toastify'
import "./App.css"
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/CreateUser' element={<CreateUser />} />
        <Route path='/editUser/:id' element={<EditUser />} />
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />

      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default App