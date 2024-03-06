import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../pages/LoginPage.scss'
import { UserContext } from "@/App.jsx";
import axios from 'axios';
import { getUser } from '../app/api';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const errorMessage = queryParams.get('error');
    const [user, setUser] = useContext(UserContext)
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [error, setError] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username.trim()) {
            newErrors.username = '*Укажите Имя Пользователя';
        } else if (!/^[a-zA-Z0-9]+$/.test(formData.username)) {
            newErrors.username = '*Недействительное Имя Пользователя';
        } else if (formData.username.length > 20) {
            newErrors.username = '*Недействительное Имя Пользователя';
        }
        if (!formData.password.trim()) {
            newErrors.password = '*Укажите Ваш Пароль';
        } else if (formData.password.length < 8 || formData.password.length > 20) {
            newErrors.password = '*Недействительный Пароль';
        } else if (!/^[a-zA-Z0-9]+$/.test(formData.password)) {
            newErrors.password = '*Недействительный Пароль';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if (validateForm()) {
            try {
                const response = await axios.post('/regauth/login/', formData);
                if (response?.data?.access) localStorage.setItem('access_token', response.data.access);
                if (response?.data?.user_id) localStorage.setItem('user_id', response.data.user_id);
                if (response.status === 200) {
                    const temp_user = await getUser(response.data.access)
                    await setUser(temp_user.data)
                    navigate('/')
                } else {
                    setError('Неправильный Логин или Пароль');
                }
            } catch (e) {
                console.log(e);
            }
        // } else {
        //     console.log('Form has errors:', errors);
        // }
    };

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
                    setError('Неверный пользователь или пароль');
                } else {
                    console.error('Ошибка:', error.message);
                }
            });
    }

    const setUserLogin = (event) => {
        setLogin(event.target.value);
    }

    const setUserPassword = (event) => {
        setPassword(event.target.value);
    }

    return (
        <div className='auth'>
            <div className="background">
                <div className='sky'><img src="../src/assets/AuthAssets/sky.svg" alt="" /></div>
                <div className='clouds'>
                    <div className="cloud_container">
                        <img src="../src/assets/AuthAssets/cloud1.svg" alt="" className='cloud1' />
                        <img src="../src/assets/AuthAssets/cloud2.svg" alt="" className='cloud2' />
                        <img src="../src/assets/AuthAssets/cloud3.svg" alt="" className='cloud3' />
                        <img src="../src/assets/AuthAssets/cloud4.svg" alt="" className='cloud4' />
                    </div>
                </div>
                <div className='nature'><img src="../src/assets/AuthAssets/authbackground.svg" alt="" /></div>
            </div>
            <div className="form_container">
                <div className="login_container">
                    <div className="login_background"></div>
                    <div className="login_title"><h1>Войти в аккаунт</h1></div>
                    <form className='login_form' onSubmit={handleSubmit}>
                        <input className='login_inputs' type="text"
                            value={formData.username} name='username' onChange={handleChange}
                            placeholder='Имя Пользователя' />
                        {errors.username && <span className='span_error'>{errors.username}</span>}
                        <input className='login_inputs' type="password"
                            value={formData.password} name='password' onChange={handleChange}
                            placeholder='Пароль' />
                        {errors.password && <span className="span_error">{errors.password}</span>}
                        {error && <span className='span_error'>{error}</span>}
                        <button className='login_button' type="submit">Войти</button>
                    </form>
                    <div className="login_redirect_container">
                        <p className='login_redirect'>Забыл Пароль ?
                            <a className='login_redirect_link' href='Recover'> Восстановить Пароль</a>
                        </p>
                        <p className='login_redirect'>Нет Аккаунта ?
                            <a className='login_redirect_link' href='SignUp'> Зарегистрироваться</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
