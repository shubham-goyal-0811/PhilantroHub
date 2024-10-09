import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useState } from 'react';

const getCookieValue = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
};

export default function Loginout() {
    const navigate = useNavigate();
    const { isAuthenticated, username } = useAuth();
    const { logout } = useAuth();
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const getInitials = (name) => {
        const names = name.split(' ');
        return names.map(n => n[0]).join('').toUpperCase();
    };
    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };
    const handleLogout = () => {
        logout();
    };
    const avatarUrl = getCookieValue('avatar');
    console.log('All Cookies:', document.cookie);
    return (
        <>
            <div className="loginout flex items-center justify-center w-1/12">
                {!isAuthenticated ? (
                    <div onClick={() => navigate('../Login')} className="login rounded-lg" style={{ padding: '10%' }}>
                        <button>Log in</button>
                    </div>
                ) : (
                    <div className="user w-full flex rounded-lg justify-center">
                        <div className="userinfo flex flex-col items-center relative">
                            <button>
                                <div className="userImg w-full flex justify-center items-center bg-gray-400 text-white rounded-full hover:bg-gray-700 duration-200" style={{ width: '4rem', height: '4rem', lineHeight: '4rem', textAlign: 'center', fontSize: '1.5rem' }} onClick={toggleDropdown}>
                                {avatarUrl ? (
                                        <img 
                                            src={avatarUrl} 
                                            alt="User Avatar" 
                                            className="rounded-full w-full h-full object-cover" 
                                        />
                                    ) : (
                                        <span style={{ lineHeight: '4rem', fontSize: '1.5rem' }}>
                                            {getInitials(username)}
                                        </span>
                                    )}
                                </div>
                            </button>
                            {dropdownVisible && (
                                <div className="absolute top-20 right-0 bg-white shadow-lg rounded-lg p-4 z-10">
                                    <div className="text-center mb-2">Welcome, {username}</div>
                                    <div className="logout flex justify-center items-center">
                                        <button
                                            className="bg-slate-300 p-1 rounded-xl whitespace-nowrap hover:bg-slate-600 hover:text-white duration-500"
                                            onClick={handleLogout}>
                                            Log out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}