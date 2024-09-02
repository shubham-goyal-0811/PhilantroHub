import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Logo from '../img/Logo.png';
import Search from '../img/search.png';
import Itachi from '../img/itachi.jpg';
import axios from 'axios';

export default function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, logout, username } = useAuth();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const handleLogout = () => {
    logout();
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  useEffect(()=>{
    axios.get("/api/v1/users/current-user")
    .then((res)=>{
      const data = JSON.stringify(res.fullName);
      console.log(data);
      setFullName(res.fullName);
      console.log("hogya");
    })
    .catch(()=>{
      console.log("nhh")
    })
  })

  return (
    <header className="w-full">
      <nav className="header_nav w-full" style={{ padding: '0.5%' }}>
        <div className="flex w-full items-center justify-between">
          <div className="flex logo">
            <a href="/" className="flex items-center left-0">
              <img src={Logo} className="w-16 mx-5 invert" alt="PhilantroHub Logo" />
            </a>
          </div>

          <div className="options flex items-center">
            <ul className="flex font-medium justify-between items-center h-full">
              <li>
                <a href="/" className="block text-gray-600 rounded">
                  Home
                </a>
              </li>
              <li>
                <a href="/" className="block text-gray-600 rounded">
                  NGO
                </a>
              </li>
              <li className="w-2/12">
                <div className="search flex justify-center w-full">
                  <img src={Search} alt="" className="w-6/12" />
                </div>
              </li>
            </ul>
          </div>

          <div className="loginout flex items-center justify-center w-1/12">
            {!isAuthenticated ? (
              <div className="login rounded-lg" style={{ padding: '10%' }}>
                <button onClick={() => navigate('./Login')}>Log in</button>
              </div>
            ) : (
              <div className="user w-full flex rounded-lg justify-center">
                <div className="userinfo flex flex-col items-center relative">
                  <div className="userImg w-full flex justify-center" onClick={toggleDropdown}>
                    <img className="w-20 h-16 rounded-full cursor-pointer" src={Itachi} alt="" />
                  </div>
                  {dropdownVisible && (
                    <div className="absolute top-20 right-0 bg-white shadow-lg rounded-lg p-4 z-10">
                      <div className="logout flex justify-center items-center">
                        <button className="bg-slate-300 p-1 rounded-xl whitespace-nowrap hover:bg-slate-600 hover:text-white duration-500" onClick={handleLogout}>
                          Log out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
