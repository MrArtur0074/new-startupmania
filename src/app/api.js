import axios from 'axios';

// Базовый URL для всех запросов
axios.defaults.baseURL = 'http://217.151.230.35:888/api/v1/';

// Функция для установки токена авторизации в заголовок запроса
const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export const loginUserData = (userData) => {
    return axios.post('/regauth/login/', userData);
};

export const getUser = (token) => {
    setAuthToken(token);
    return axios.get(`/regauth/user-info/`);
};

export const getAllIdeas = () => {
    const access_token = localStorage.getItem('access_token')
    return axios.get('/idea/all-ideas/', {
        headers: {'Authorization': `Bearer ${access_token}`}
      })
};


export default {
    loginUserData,
    getUser,
    getAllIdeas
    // Добавить другие функции сюда при необходимости
};