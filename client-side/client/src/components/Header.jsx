import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Logo from '../img/Logo.png';
import Search from '../img/search.png';

export default function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="w-full">
      <nav className="header_nav w-full" style={{ padding: '0.5%' }}>
        <div className="flex w-full items-center justify-around">
          <div className="flex logo">
            <a href="/" className="flex items-center left-0">
              <img src={Logo} className="w-16 mx-5 invert" alt="PhilantroHub Logo" />
            </a>
          </div>

          <div className="options flex w-2/12 items-center">
            <div className="flex justify-evenly">
              <ul className="flex font-medium justify-evenly items-center">
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
                  <div className="search">
                    <img src={Search} alt="" className="w-full" />
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex w-auto items-center whitespace-nowrap">
            {!isAuthenticated ? (
              <div className="login w-auto rounded-lg" style={{ padding: '10%' }}>
                <button onClick={() => navigate('./Login')}>Log in</button>
              </div>
            ) : (
              <div className="user flex w-auto rounded-lg" style={{ margin: '10%' }}>
                <div className="userinfo flex flex-col">
                  <div className="userImg">

                  </div>
                  <div className="userName">
                    <h1>Hello</h1>
                  </div>
                </div>
                <div className="logout">
                  <button onClick={handleLogout}>Log out</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
