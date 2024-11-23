import React, { useState } from 'react';
import Search from '../../img/search.png';

export default function Options({scrolled}) {
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchClick = () => {
        if(showSearchBar){
            setShowSearchBar(false);
        }
        else{
            setShowSearchBar(true);
        }
    };

    return (
        <>
            <div className="options flex items-center">
                <ul className="flex font-medium justify-between items-center h-full w-full">
                    {!showSearchBar && (
                        <>
                            <li className="hover:font-bold hover:text-xl duration-300">
                                <a href="/" className="block rounded">
                                    Home
                                </a>
                            </li>
                            <li className="hover:font-bold hover:text-xl duration-300">
                                <a href="/ngo" className="block rounded">
                                    NGO
                                </a>
                            </li>
                        </>
                    )}
                    <li className="w-2/12">
                        <div className="search flex justify-center w-full">
                            <img
                                src={Search}
                                alt="Search"
                                className={`w-7/12 cursor-pointer ${scrolled ? '' : 'filter invert'}`}
                                onClick={handleSearchClick}
                            />
                        </div>
                    </li>
                    {showSearchBar && (
                        <li className="w-full">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search NGOs by name or category..."
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </li>
                    )}
                </ul>
            </div>
        </>
    );
}
