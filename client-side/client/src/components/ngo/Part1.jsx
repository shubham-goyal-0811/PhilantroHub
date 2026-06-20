import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Part1({ searchQuery }) {
    const ngoTypesArray = [
        "All NGOS",
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
    const ngoRefs = useRef([]);
    const typeRefs = useRef([]);
    const [hasAnimated, setHasAnimated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchNgos();
    }, []);

    useEffect(() => {
        if (filteredNgos.length > 0 && !hasAnimated) {
            //NGOs animation
            gsap.fromTo(
                ngoRefs.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, stagger: 0.4, duration: 1.5 }
            );

            //categories animation
            gsap.fromTo(
                typeRefs.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, stagger: 0.4, duration: 1.5 }
            );
            setHasAnimated(true);
        }
    }, [filteredNgos, hasAnimated]);

    //fetching data and storing it in ngos and filteredngos array.
    const fetchNgos = async () => {
        try {
            const response = await fetch('/api/v1/ngo/getNgos', {
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Fetched NGOs:', data);
            if (data.success && Array.isArray(data.data)) {
                setNgosArray(data.data);
                setFilteredNgos(data.data);
            } else {
                console.error('Fetched data is not an array:', data);
            }
        } catch (error) {
            console.error('Error fetching NGOs:', error);
        }
    };

    //filtering of NGOs
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
    if (selectedType === "All NGOS") {
        setSelectedType("");
        setFilteredNgos(ngosArray);
    }

    const handleViewMore = (ngo) => {
        navigate(`/view-more/${ngo.name}`, { state: { ngo } });
    };

    return (
        <div className="parentmain1 h-full w-full bg-[#d2c9c9]">
            <div className="childmain1 h-full overflow-hidden">
                <div className="w-full flex justify-center">
                    <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold">NGO's</h1>
                </div>
                <div className="ngos h-full flex flex-col md:flex-row justify-around overflow-hidden">
                    <div className="cate flex flex-col w-full md:w-3/12 h-2/12 items-center text-nowrap bg-[#f2f0ef] rounded-3xl shadow-2xl shadow-stone-800 duration-200" style={{ padding: "1%", margin: "2%" }}>
                        <h1 className="text-3xl md:text-5xl text" style={{ padding: "1%", margin: "0.5%" }}>
                            Categories
                        </h1>
                        <hr className="h-1 bg-slate-400 w-full rounded-full m-3" />
                        <div className="types flex flex-col text-center">
                            {ngoTypesArray.map((type, index) => (
                                <span
                                    key={index}
                                    ref={(el) => typeRefs.current[index] = el}
                                    className={`catespan w-full text-lg md:text-2xl rounded-full ${selectedType === type ? "bg-gray-200 font-bold" : ""}`}
                                    style={{ padding: "3%", margin: "0.5%" }}
                                    onClick={() => handleTypeClick(type)}
                                >
                                    {type}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="ngosdiv w-full md:w-9/12 flex flex-col items-center" style={{ padding: "1%", margin: "0.5%" }}>
                        {filteredNgos.map((ngo, index) => (
                            <div
                                ref={(el) => ngoRefs.current[index] = el}
                                className="ngospace w-full md:w-10/12 h-auto flex flex-col text-2xl md:text-4xl justify-center bg-[#f2f0ef] rounded-3xl shadow-2xl shadow-stone-800 p-4 md:p-2"
                                style={{ margin: "0.5%" }}
                                key={index}
                            >
                                <div className="ngoTitle flex items-center justify-center w-full">
                                    <div className="ngotitle flex w-full md:w-1/2 text-center justify-center">
                                        <h1 className="font-bold text-3xl md:text-5xl">{ngo.name}</h1>
                                    </div>
                                </div>
                                <div className="ngodes&img flex flex-col md:flex-row items-center justify-evenly w-full gap-4 md:gap-0">
                                    <div className="ngoimg flex justify-center items-center" style={{ padding: "0.5%", margin: "0.5%" }}>
                                        <div className="imghere flex w-32 md:w-2/12 items-center">
                                            <img src={ngo.logo} alt="imgngo" className="rounded-full shadow-2xl w-full" />
                                        </div>
                                    </div>
                                    <div className="ngodescription flex w-full md:w-6/12 text-center items-center justify-center border-2 border-[#bca77e] border-dashed rounded-2xl" style={{ padding: "0.5%", margin: "0.5%" }}>
                                        <h2 className="text-base md:text-2xl">{ngo.description}</h2>
                                    </div>
                                </div>
                                <div className="visitbutton flex justify-center">
                                    <button className="bg-slate-300 rounded-lg text-xl hover:bg-slate-500 duration-200 hover:text-white" style={{ padding: "0.5%", margin: "0.5%" }} onClick={() => handleViewMore(ngo)}>
                                        View More
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
