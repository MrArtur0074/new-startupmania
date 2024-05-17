import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

export const getAllTeams = (token) => {
    setAuthToken(token)
    return axios.get('/team/all-teams/')
};

export const getAllUsers = (token) => {
    setAuthToken(token)
    return axios.get(`/regauth/user-list`)
}

export const getThisIdea = async (token,id) => {
    setAuthToken(token)
    return axios.get(`/idea/get-idea/${id}`)
};

export const getThisUser = (token,id) => {
    setAuthToken(token)
    return axios.get(`/regauth/user-search/${id}`)
};

export const createIdea = (token, formData) => {
    setAuthToken(token)
    return axios.post('/idea/create/', formData)
}

export const createTeam = (token, formData) => {
    setAuthToken(token)
    return axios.post('/team/create-team/', formData)
}

export const handleLikeIdeaFunc = async (token,id) => {
    setAuthToken(token)
    return axios.post(`/idea/ideas/${id}/like/`)
};

export const handleDislikeIdeaFunc = async (token,id) => {
    setAuthToken(token)
    return axios.post(`/idea/ideas/${id}/delite-like/`)
};

export const handleSupportIdeaFunc = async (token,id) => {
    setAuthToken(token)
    return axios.post(`/idea/ideas/${id}/supporter/`)
};

export const handleStopSupportIdeaFunc = async (token,id) => {
    setAuthToken(token)
    return axios.post(`/idea/ideas/${id}/supporter-decline/`)
};


export default {
    loginUserData,
    getUser,
    getAllIdeas,
    getAllTeams,
    getAllUsers,
    unAuthNav,
    createIdea,
    createTeam,
    getThisIdea,
    getThisUser,
    handleLikeIdeaFunc,
    handleDislikeIdeaFunc,
    handleSupportIdeaFunc,
    handleStopSupportIdeaFunc,
};