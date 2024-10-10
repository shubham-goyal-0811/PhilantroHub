import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const [profile, setProfile] = useState({
        username: '',
        email: '',
        fullName: '',
        avatar: '',
        role: '',
        mobileNo: '',
        donation: [],
    });

    const [isEditing, setIsEditing] = useState(false);
    const [updatedProfile, setUpdatedProfile] = useState({ ...profile });
    const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' });

    const navigate = useNavigate();

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/v1/users/profile', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            if (data.success) {
                setProfile(data.data);
            } else {
                console.error('Failed to fetch profile:', data.message);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProfile({ ...updatedProfile, [name]: value });
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords({ ...passwords, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/v1/users/profile/update', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: updatedProfile.username,
                    email: updatedProfile.email,
                    currentPassword: passwords.currentPassword,
                    newPassword: passwords.newPassword,
                }),
            });

            const data = await response.json();
            if (data.success) {
                setProfile({ ...profile, ...updatedProfile });
                setIsEditing(false);
                alert('Profile updated successfully!');
            } else {
                alert('Failed to update profile: ' + data.message);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className="min-h-screen bg-off-white flex justify-center items-center">
            <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-4xl">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold">Profile</h1>
                    {!isEditing && (
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700" onClick={() => setIsEditing(true)}>
                            Edit Profile
                        </button>
                    )}
                </div>
                {isEditing ? (
                    <>
                        <div className="space-y-4">
                            <div>
                                <label className="block font-semibold">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={updatedProfile.username}
                                    onChange={handleInputChange}
                                    className="w-full border p-2 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={updatedProfile.email}
                                    onChange={handleInputChange}
                                    className="w-full border p-2 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold">Current Password</label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={passwords.currentPassword}
                                    onChange={handlePasswordChange}
                                    className="w-full border p-2 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold">New Password</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={passwords.newPassword}
                                    onChange={handlePasswordChange}
                                    className="w-full border p-2 rounded-lg"
                                />
                            </div>
                            <button
                                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                                onClick={handleSubmit}
                            >
                                Save Changes
                            </button>
                            <button
                                className="ml-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <img src={profile.avatar} alt="avatar" className="rounded-full w-24 h-24 mr-6" />
                                <div>
                                    <h2 className="text-xl font-bold">{profile.fullName}</h2>
                                    <p>{profile.role}</p>
                                </div>
                            </div>
                            <div>
                                <label className="block font-semibold">Username:</label>
                                <p>{profile.username}</p>
                            </div>
                            <div>
                                <label className="block font-semibold">Email:</label>
                                <p>{profile.email}</p>
                            </div>
                            <div>
                                <label className="block font-semibold">Mobile No:</label>
                                <p>{profile.mobileNo}</p>
                            </div>
                            <div>
                                <label className="block font-semibold">Donations:</label>
                                <ul>
                                    {profile.donation.map((donation, index) => (
                                        <li key={index}>{donation}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
