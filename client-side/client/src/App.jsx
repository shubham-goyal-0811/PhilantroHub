import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Frontpage from './components/frontpage/Frontpage';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <Router>
      <Routes>
        //frontpage and header
        <Route
          path="/" element={<>
          <Header />
          <Frontpage />
          </>}/>
          //login
        <Route path="/login" element={<Login />} />
        <Route path="/login/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
