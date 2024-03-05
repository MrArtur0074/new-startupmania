import React from 'react';
import DefaultTemplate from "@/components/DefaultTemplate.jsx";
import styles from "@/pages/LoginPage.module.css";
import {Link, useNavigate} from "react-router-dom";
import {loginUserData, getUser} from '@/app/api.js';
import {UserContext} from "@/App.jsx";
const LoginPage = () => {
    const [user, setUser] = React.useContext(UserContext);
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    const navigate = useNavigate();

    const setUserLogin = (event) => {
        setLogin(event.target.value);
    }

    const setUserPassword = (event) => {
        setPassword(event.target.value);
    }

    async function loginUser(event) {
        event.preventDefault();

        const userData = {
            username: login,
            password: password
        };

        loginUserData(userData)
            .then(async response => {
                console.log('Успешный вход:', response.data);
                localStorage.setItem('access', response.data.access);
                localStorage.setItem('refresh', response.data.refresh);
                let user = await getUser(response.data.access)
                console.log('Пользователь:', user.data)
                setUser(user.data)
                navigate('/');
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    setErrorMessage('Неверный пользователь или пароль');
                } else {
                    console.error('Ошибка:', error.message);
                }
            });
    }

    return (
        <>
            <DefaultTemplate>
                <div className={styles.containter}>
                    <div className={styles.wrapper}>
                        <h1 className={styles.h1}>ВОЙТИ В АККАУНТ</h1>
                        <div>
                            <form className={styles.form} onSubmit={loginUser}>
                                <div>
                                    <input onChange={setUserLogin} className={styles.input} type="text" placeholder="Логин" />
                                </div>
                                <div>
                                    <input onChange={setUserPassword} className={styles.input} type="password" placeholder="Пароль" />
                                </div>
                                <div>
                                    <input className={styles.button} type='submit' value='Войти' />
                                </div>
                                {errorMessage && <div className={styles.error}>{errorMessage}</div>}
                                <div>
                                    <Link className={styles.link} to='/pass'>Забыли пароль?</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </DefaultTemplate>
        </>
    );
}

export default LoginPage