import { createContext, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routers from "@/app/Routers.jsx";
import './App.css'
import { getUser, unAuthNav } from "./app/api.js";
export const UserContext = createContext();
export const DateContext = createContext()
function App() {
    const [user, setUser] = useState(false);
    const [date, setDate] = useState(new Date('2024-06-10T00:00:00'));
    useEffect(() => {
        const access = localStorage.getItem('access_token');
        if (access) {
            getUser(access)
                .then(response => {
                    setUser(response.data);
                    console.log(response.data)
                })
                .catch(error => {
                    console.error('Ошибка:', error.message);
                    unAuthNav()
                });
        } else {
            unAuthNav()
        }
    }, []);
    return (
        <>
            <DateContext.Provider value={[date,setDate]}>
                <UserContext.Provider value={[user, setUser]}>
                    <BrowserRouter>
                        <Routers />
                    </BrowserRouter>
                </UserContext.Provider>
            </DateContext.Provider>
        </>
    )
}
export default App