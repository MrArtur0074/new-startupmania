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

export const unAuthNav = () => {
    localStorage.removeItem('access_token', 'id');
    navigate(`/login`)
}

export const loginUserData = (userData) => {
    return axios.post('/regauth/login/', userData);
};

export const getUser = (token) => {
    setAuthToken(token);
    return axios.get(`/regauth/user-info/`);
};

export const getAllIdeas = (token) => {
    setAuthToken(token)
    return axios.get('/idea/all-ideas/')
};

export const createIdea = (token, formData) => {
    setAuthToken(token)
    return axios.post('/idea/create/', formData)
}


export default {
    loginUserData,
    getUser,
    getAllIdeas,
    unAuthNav,
    createIdea
};