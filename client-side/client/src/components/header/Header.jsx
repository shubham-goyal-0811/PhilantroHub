import Logo from './Logo';
import Options from './Options';
import Loginout from './Loginout';
import React, {useRef,useEffect, useState}from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

export default function Header() {
    const headerRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        gsap.fromTo(headerRef.current, 
            { y: -100, opacity: 0 },
            {
                y: 0, 
                opacity: 1, 
                duration: 4,
                ease: "power2.out",
            }
        );
    }, []);
    return (
        <>
            <header className="w-full">
                <nav ref={headerRef} className="header_nav w-full" style={{ padding: '0.5%' }}>
                    <div className="flex w-full items-center justify-between">
                        <Logo />
                        <Options  />
                        <Loginout />
                    </div>
                </nav>
            </header>
        </>
    );
}