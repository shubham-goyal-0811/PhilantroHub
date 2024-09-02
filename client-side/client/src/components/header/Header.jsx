import Logo from './Logo';
import Options from './Options';
import Loginout from './Loginout';
import React from 'react';

export default function Header() {
    return (
        <>
            <header className="w-full">
                <nav className="header_nav w-full" style={{ padding: '0.5%' }}>
                    <div className="flex w-full items-center justify-between">
                        <Logo />
                        <Options />
                        <Loginout />
                    </div>
                </nav>
            </header>
        </>
    );
}