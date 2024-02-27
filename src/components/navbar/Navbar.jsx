import React, {useContext} from 'react';
import styles from './Navbar.module.css';
import open from '@/assets/icons/open.png';
import close from '@/assets/icons/close.png';
import {UserContext} from '@/App.jsx';
import {Link} from "react-router-dom";

const Navbar = () => {
    const [active, setActive] = React.useState(false);
    const [user, setUser] = useContext(UserContext);

    function toggleNav() {
        setActive(!active);
    }

    function logout() {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setUser(false);
    }

    return (
        <div className={`${styles.mainWrapper} ${(active) ? styles.active : ''}`}>
            <nav className={(active) ? styles.active : ''}>
                <div className={styles.wrapper}>
                    <div className={styles.logo}>
                        <span>STARTUP</span>
                    </div>
                    {user ? (
                        <ul className={styles.menu}>
                            <li><Link to="/">Главная</Link></li>
                            <li><Link to="/ideas">Все идеи</Link></li>
                            <li><Link to="/profile">Профиль</Link></li>
                            <li><Link to="/settings">Настройки</Link></li>
                            <li><Link to="#" onClick={logout}>Выход</Link></li>
                        </ul>
                    ) : (
                        <ul className={styles.menu}>
                            <li><Link to="/">Главная</Link></li>
                            <li><Link to="/login">Войти</Link></li>
                            <li><Link to="/register">Регистрация</Link></li>
                        </ul>
                    )}
                </div>
            </nav>
            <div className={styles.openBtn}>
                <img onClick={toggleNav} src={(active) ? close : open}/>
            </div>
        </div>
    );
}

export default Navbar