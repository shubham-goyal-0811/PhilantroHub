import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Frontpage from './components/frontpage/Frontpage';
import Login from './components/Login';
import Signup from './components/Signup';
import Ngo from './components/ngo/Ngofp';
import ViewMore from './components/ngo/ViewMore';
import Profile from './components/Profile/Profile';

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
        <Route path="/users/profile" element={<Profile />} />
        <Route path="/ngo" element={<Ngo />} />
        <Route path="/login/signup" element={<Signup />} />
        <Route path="/view-more/:name" element={<ViewMore />} />
      </Routes>
    </Router>
  );
}

export default App;
