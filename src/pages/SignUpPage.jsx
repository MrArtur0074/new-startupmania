import React, { useState } from 'react';
import '../pages/LoginPage.scss'
import { UserContext } from "@/App.jsx";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate ();
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
    });
    const [data,setData] = useState({
      username:'',
      name: '',
      email: '',
      password:'',
      password_confirm: '',
      phone: '',
    })
    const [errors, setErrors] = useState({});
    const validateForm = () => {
        const newErrors = {};    
        if (!formData.username.trim()) {
          newErrors.username = '*Укажите Имя Пользователя';
        } else if (!/^[a-zA-Z0-9]+$/.test(formData.username)) {
          newErrors.username = '*Имя Пользователя Может Иметь Только Латинские Буквы';
        } else if (formData.username.length > 20) {
          newErrors.username = '*Имя Пользователя Должно Состоять Из 20 Или Менее Символов';
        }    
        if (!formData.name.trim()) {
            newErrors.name = '*Укажите Ваше Имя';
        } else if (!/^[a-zA-Z ]+$/.test(formData.name)) {
            newErrors.name = '*Имя Может Иметь Только Латинские Буквы И Пробелы';
        } else if (formData.name.length > 20) {
            newErrors.name = '*Имя Должно Состоять Из 20 Или Менее Символов';
        }   
        if (!formData.password.trim()) {
            newErrors.password = '*Придумайте Пароль';
          } else if (formData.password.length < 8 || formData.password.length > 20) {
            newErrors.password = '*Пароль Должен Быть От 8 До 20 Символов';
          } else if (!/^[a-zA-Z0-9]+$/.test(formData.password)) {
            newErrors.password = '*Пароль Может Иметь Только Латинские Буквы И Цифры';
        }    
        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = '*Подтвердите Пароль';
        } else if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = '*Пароли Не Совпадают';
        }   
        if (!formData.phone.trim()) {
          newErrors.phone = '*Укажите Ваш Номер Телефона';
        } else if (!/^\+\d+$/.test(formData.phone)) {
          newErrors.phone = '*Номер Должен Начинаться С + И Состоять Только Из Цифр';
        }    
        if (!formData.email.trim()) {
          newErrors.email = '*Укажите Ваш Электронный Адрес';
        } else if (!/^\w+([\.-]?\w+)*@gmail.com$/.test(formData.email)) {
          newErrors.email = '*Принимаются Только Электронные Адреса Домена @gmail.com';
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
          setData({
            username: formData.username,
            name: formData.name,
            email: formData.email,
            password: formData.password,
            password_confirm: formData.confirmPassword,
            phone_number: formData.phone,
          });
          try {
            const response = await axiosClient.post('/regauth/register/',data);
            if (response.status === 200) {navigate('/confirm')}
          } catch (e) {
            console.log(e);
          }
        } else {
          console.log('Form has errors:', errors);
        }
    };
    const handleChange = (e) => {setFormData({ ...formData, [e.target.name]: e.target.value });};
  return (
    <div className='auth'>
        <div className="background">
            <div className='sky'><img src="../src/assets/AuthAssets/sky.svg" alt=""/></div>
            <div className='clouds'>
                <div className="cloud_container">
                    <img src="../src/assets/AuthAssets/cloud1.svg" alt="" className='cloud1'/>
                    <img src="../src/assets/AuthAssets/cloud2.svg" alt="" className='cloud2'/>
                    <img src="../src/assets/AuthAssets/cloud3.svg" alt="" className='cloud3'/>
                    <img src="../src/assets/AuthAssets/cloud4.svg" alt="" className='cloud4'/>
                </div>
            </div>
            <div className='nature'><img src="../src/assets/AuthAssets/authbackground.svg" alt=""/></div>
        </div>
        <div className="form_container">
            <div className="login_container">
                <div className="login_background"></div>
                <div className="login_title"><h1>Зарегистрироваться</h1></div>
                <form className='login_form' onSubmit={handleSubmit}>
                    <input className='login_inputs'type="text"
                    value={formData.username} name='username' onChange={handleChange}
                    placeholder='Имя Пользователя'/>
                    {errors.username && <span className='span_error'>{errors.username}</span>}
                    <input className='login_inputs'type="text"
                    value={formData.name} name='name' onChange={handleChange}
                    placeholder='Имя'/>
                    {errors.name && <span className="span_error">{errors.name}</span>}
                    <input className='login_inputs'type="email"
                    value={formData.email} name='email' onChange={handleChange}
                    placeholder='Электронный Адрес'/>
                    {errors.email && <span className="span_error">{errors.email}</span>}
                    <input className='login_inputs' type="password"
                    value={formData.password} name='password' onChange={handleChange}
                    placeholder='Пароль'/>
                    {errors.password && <span className="span_error">{errors.password}</span>}
                    <input className='login_inputs' type="password"
                    value={formData.confirmPassword} name='confirmPassword' onChange={handleChange}
                    placeholder='Подтвердите Пароль'/>
                    {errors.confirmPassword && <span className="span_error">{errors.confirmPassword}</span>}
                    <input className='login_inputs' type="text"
                    value={formData.phone} name='phone' onChange={handleChange}
                    placeholder='Номер Телефона'/>
                    {errors.phone && <span className="span_error">{errors.phone}</span>}
                    <button className='login_button' type="submit">Зарегистрироваться</button>
                </form>
                <div className="login_redirect_container">
                    <p className='login_redirect'>Уже Есть Аккаунт ?
                        <a className='login_redirect_link' href='SignUp'> Войти</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignUp
