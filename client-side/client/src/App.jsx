import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Frontpage from './components/frontpage/Frontpage';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        //frontpage and header
        <Route
          path="/"
          element={<>
          <Header />
          <Frontpage />
          </>}/>
          //login
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
