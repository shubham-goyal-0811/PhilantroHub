import React, { useState } from "react";

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

    const ngosArray = [
        {
            name: "NGO Name 1",
            description: "Description 1",
            img: "https://example.com/img1.jpg",
            type: ngoTypesArray[0]
        },
        {
            name: "NGO Name 2",
            description: "Description 2",
            img: "https://example.com/img2.jpg",
            type: "Advocacy NGOs"
        },
        {
            name: "NGO Name 3",
            description: "Description 3",
            img: "https://example.com/img3.jpg",
            type: "Educational NGOs"
        },
        {
            name: "NGO Name 4",
            description: "Description 4",
            img: "https://example.com/img4.jpg",
            type: "Environmental NGOs"
        }
    ];
    const [selectedType, setSelectedType] = useState("");
    const handleTypeClick = (type) => {
        setSelectedType(type);
    };
    const filteredNgos = selectedType ? ngosArray.filter((ngo) => ngo.type === selectedType) : ngosArray;

    return (
        <>
            <div className="parentmain1 h-full w-full">
                <div className="childmain1">
                    <div className="ngos flex justify-between">
                        <div className="cate h-full w-3/12" style={{ padding: "1%", margin: "0.5%" }}>
                            <h1 className="text-5xl text" style={{ padding: "1%", margin: "0.5%" }}>
                                Types of NGOs
                            </h1>
                            <hr className="h-1 bg-slate-400 rounded-full m-3" />
                            <div className="types flex flex-col">
                                {ngoTypesArray.map((type, index) => (
                                    <span key={index} className={`text-2xl cursor-pointer ${selectedType === type ? "bg-gray-200 font-bold" : ""}`} style={{ padding: "1%", margin: "0.5%" }} onClick={() => handleTypeClick(type)}>
                                        {type}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="ngosdiv w-full h-full flex flex-col items-center" style={{ padding: "1%", margin: "0.5%" }}>
                            {filteredNgos.map((ngo, index) => (
                                <div className="ngospace w-full flex flex-col text-4xl justify-center" style={{ padding: "0.5%", margin: "0.5%" }} key={index}>
                                    <div className="ngoTitle flex items-center justify-center w-full">
                                        <div className="ngotitle flex w-1/2 text-center justify-center">
                                            <h1>{ngo.name}</h1>
                                        </div>
                                    </div>
                                    <div className="ngodes&img flex justify-center">
                                        <div className="ngoimg" style={{ padding: "0.5%", margin: "0.5%" }}>
                                            <div className="imghere w-full items-center">
                                                <img src={ngo.img} alt="imgngo" />
                                            </div>
                                        </div>
                                        <div className="ngodescription w-full text-center" style={{ padding: "0.5%", margin: "0.5%" }}>
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
