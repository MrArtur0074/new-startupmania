import React from 'react';
import Header from "@/components/header/Header.jsx";
import Footer from "@/components/footer/Footer.jsx";

const DefaultTemplate = ({children}) => {
    return (
        <>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </>
    );
}

export default DefaultTemplate