import {Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import ProfilePage from "@/pages/ProfilePage.jsx";
import IdeasPage from "@/pages/IdeasPage.jsx";
import UserPage from '../pages/UserPage';
import IdeaPage from '@/pages/IdeaPage.jsx'
import TeamsPage from '../pages/TeamsPage';
import SignUpPage from '../pages/SignUpPage';
import TeamPage from '../pages/TeamPage';
import TournamentPage from '../pages/TournamentPage';
import ErrorPage from '../pages/ErrorPage';

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/login/:error" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/ideas" element={<IdeasPage />} />
            <Route path="/idea/:id" element={<IdeaPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/:id" element={<UserPage />} />
            <Route path="/teams/" element={<TeamsPage />} />
            <Route path="/team/:id" element={<TeamPage />} />
            <Route path="/leaderboard" element={<TournamentPage />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
}

export default Routers