import React from 'react';
import SideBar from './Navbar/SideBar';
import Bottombar from './Navbar/Bottombar';

const DefaultTemplate = ({children}) => {
    return (
        <>
            <main>
                {children}
                <SideBar/>
                <Bottombar/>
            </main>
        </>
    );
}

export default DefaultTemplate