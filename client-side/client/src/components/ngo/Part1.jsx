import React, { useEffect, useState } from "react";

export default function Part1() {
    const ngoTypesArray = [
        "Charitable Organizations",
        "Advocacy NGOs",
        "Social Welfare Organizations",
        "Environmental NGOs",
        "Educational NGOs",
        "Healthcare NGOs",
        "Cultural NGOs",
        "Microfinance NGOs",
        "Religious NGOs",
        "Research and Policy NGOs",
        "Disaster Relief NGOs",
        "Rural Development NGOs",
        "Youth and Sports NGOs",
        "Women Empowerment NGOs"
    ];

    const [ngosArray, setNgosArray] = useState([]);
    const [filteredNgos, setFilteredNgos] = useState([]);
    const [selectedType, setSelectedType] = useState("");

    useEffect(() => {
        fetchNgos();
    }, []);
    //fetching data and storing it in ngos and filteredngos array.
    const fetchNgos = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/v1/ngo/getNgos');
            const data = await response.json();
            console.log('Fetched NGOs:', data);
            if (data.success && Array.isArray(data.data)) {
                setNgosArray(data.data);
                setFilteredNgos(data.data);
            }
            else {
                console.error('Fetched data is not an array:', data);
            }
        }
        catch (error) {
            console.error('Error fetching NGOs:', error);
        }
    };
    //filtering of ngos.
    const handleTypeClick = (type) => {
        setSelectedType(type);
        const filtered = ngosArray.filter((ngo) => {
            const ngoCategory = ngo.category ? ngo.category.toLowerCase() : "";
            const selectedCategory = type.toLowerCase();
            return ngoCategory.includes(selectedCategory) || selectedCategory.includes(ngoCategory);
        });
        setFilteredNgos(filtered);
    };
    //clear button
    const handleClear = () => {
        setSelectedType("");
        setFilteredNgos(ngosArray);
    };

    return (
        <>
            <div className="parentmain1 h-full w-full">
                <div className="childmain1">
                    <div className="ngos flex justify-between">
                        <div className="cate flex flex-col h-full w-3/12 items-center text-nowrap bg-slate-100 rounded-3xl hover:scale-105 shadow-2xl duration-200" style={{ padding: "1%", margin: "0.5%" }}>
                            <h1 className="text-5xl text" style={{ padding: "1%", margin: "0.5%" }}>
                                Categories
                            </h1>
                            <hr className="h-1 bg-slate-400 rounded-full m-3" />
                            <div className="types flex flex-col text-center">
                                {ngoTypesArray.map((type, index) => (
                                    <span key={index} className={`text-xl cursor-pointer rounded-full ${selectedType === type ? "bg-gray-200 font-bold" : ""} hover:bg-gray-600 hover:text-white duration-500`} style={{ padding: "2%", margin: "0.5%" }} onClick={() => handleTypeClick(type)}>
                                        {type}
                                    </span>
                                ))}
                            </div>
                            <div className="clr flex w-full" style={{ padding: "1%", margin: "0.5%" }}>
                                <button onClick={handleClear} className="text-xl bg-slate-100 text-black rounded p-2 hover:bg-black hover:text-white duration-200" >
                                    Clear
                                </button>
                            </div>
                        </div>
                        <div className="ngosdiv w-full h-full flex flex-col items-center" style={{ padding: "1%", margin: "0.5%" }}>
                            {filteredNgos.map((ngo, index) => (
                                <div className="ngospace w-full flex flex-col text-4xl justify-center bg-slate-100 rounded-3xl shadow-2xl" style={{ padding: "0.5%", margin: "0.5%" }} key={index}>
                                    <div className="ngoTitle flex items-center justify-center w-full">
                                        <div className="ngotitle flex w-1/2 text-center justify-center">
                                            <h1>{ngo.name}</h1>
                                        </div>
                                    </div>
                                    <div className="ngodes&img flex justify-center">
                                        <div className="ngoimg" style={{ padding: "0.5%", margin: "0.5%" }}>
                                            <div className="imghere flex w-full items-center">
                                                <img src={ngo.logo} alt="imgngo" />
                                            </div>
                                        </div>
                                        <div className="ngodescription w-auto text-center border-2 border-red-100 border-dashed" style={{ padding: "0.5%", margin: "0.5%" }}>
                                            <h1>{ngo.description}</h1>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
