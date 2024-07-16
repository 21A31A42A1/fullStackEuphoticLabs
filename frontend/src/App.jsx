import React from 'react'
import { Routes, Route, Router } from 'react-router-dom'
import Dashboard from './pages/Dashboard';


const App = () => {
  return (
      <Routes>
        <Route path='/' element={<Dashboard />}/>
      </Routes>
  );
};

export default App;