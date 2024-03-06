import {createContext, useEffect, useState} from 'react'
import {BrowserRouter} from 'react-router-dom'
import Routers from "@/app/Routers.jsx";
import './App.css'
import {getUser} from "@/app/api.js";

export const UserContext = createContext();
function App() {
    const [user, setUser] = useState(false);

    useEffect(() => {
        const access = localStorage.getItem('access');
        const refresh = localStorage.getItem('refresh');
        if (access && refresh) {
            getUser(access)
                .then(response => {
                    console.log(response.data)
                    setUser(response.data);
                })
                .catch(error => {
                    console.error('Ошибка:', error.message);
                    localStorage.removeItem('access');
                });
        }
    }, []);

  return (
    <>
        <UserContext.Provider value={[user,setUser]}>
            <BrowserRouter>
                <Routers />
            </BrowserRouter>
        </UserContext.Provider>
    </>
  )
}

export default App
