import React from 'react';
import SideBar from './Navbar/SideBar';

const DefaultTemplate = ({children}) => {
    return (
        <>
            <main>
                {children}
                <SideBar/>
            </main>
        </>
    );
}

export default DefaultTemplate