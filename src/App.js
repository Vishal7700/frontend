import React from 'react';
import Login from "./pages/Login.js"
import Dashboard from "./pages/Dashboard.js"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddDoctors from './pages/AddDoctors.js';
import Profile from './pages/Profile.js';
import UpdateDoctor from './pages/UpdateDoctor.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add" element={<AddDoctors />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/update/:id" element={<UpdateDoctor />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
