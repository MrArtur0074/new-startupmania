import { useContext, useEffect, useState } from 'react';
import DefaultTemplate from "@/components/DefaultTemplate.jsx";
import "../pages/IdeasPage.scss";
import filter from "@/assets/icons/filter.svg";
import { getAllIdeas } from "@/app/api.js";
import { UserContext } from "@/App.jsx";
import Idea from "@/components/ideas/Idea.jsx";
import axios from 'axios';

function IdeasPage() {
    const [user, setUser] = useContext(UserContext);
    const [tab, setTab] = useState('all');
    const [ideas, setIdeas] = useState([]);
    const [create, setCreate] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredIdeas, setFilteredIdeas] = useState([]);
    const [createMessage, setCreateMessage] = useState(false)
    const maxDescLength = 300;
    const maxNameLength = 30;

    const handleDescChange = (e) => {
        const inputText = e.target.value;
        if (inputText.length <= maxDescLength) {
            handleChange(e)
        }
    };
    const handleNameChange = (e) => {
        const inputText = e.target.value;
        if (inputText.length <= maxNameLength) {
            handleChange(e)
        }
    };
    const access_token = localStorage.getItem('access_token');
    const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!access_token) {
            navigate('/login');
        } else {
            try {
                const response = await axios.post('/idea/create/', formData, {
                    headers: { 'Authorization': `Bearer ${access_token}` }
                });
                if (response.data.code) {
                    unAuthNav()
                } else {
                    setCreateMessage(true)
                    setFormData(prevFormData => ({ ...prevFormData, name: '', description: '' }));
                    setTimeout(setCreateMessage(false), 5000);
                }
            } catch (e) {
                console.log(e);
            }
        }
    };
    const unAuthNav = () => {
        localStorage.removeItem('access_token', 'id');
        setError('"Ваша сессия истекла. Пожалуйста, войдите снова, чтобы продолжить пользоваться нашими услугами.');
        navigate(`/login?error=${encodeURIComponent('auth')}`)
    }
    const showCreate = () => {
        { create ? setCreate(false) : setCreate(true) }
    }
    const viewIdeas = filteredIdeas.map((ideaBlock, index) => {
        return (
            <Idea key={index} idea={ideaBlock} />
        );
    });
    useEffect(() => {
        filterIdeas();
    }, [tab]);
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredIdeas(ideas);
        } else {
            setFilteredIdeas(
                ideas.filter(ideaBlock =>
                    ideaBlock.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }
    }, [ideas, searchQuery]);
    useEffect(() => {
        getAllIdeas().then((response) => {
            console.log(response.data)
            setIdeas(response.data);
            setFilteredIdeas(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, [])
    function filterIdeas() {
        if (tab === 'all') {
            setFilteredIdeas(ideas);
        } else if (tab === 'my') {
            setFilteredIdeas(ideas.filter((idea) => user.id === idea.created_by));
        }
    }
    return (
        <>
            <DefaultTemplate>
                <div className='ideas'>
                    <div id="background_container">
                        <div className="background">
                            <div className='sky'><img src="../src/assets/background/sky.svg" alt="" /></div>
                            <div className='clouds'>
                                <div className="cloud_container">
                                    <img src="../src/assets/background/cloud1.svg" alt="" className='cloud1' />
                                    <img src="../src/assets/background/cloud2.svg" alt="" className='cloud2' />
                                    <img src="../src/assets/background/cloud3.svg" alt="" className='cloud3' />
                                    <img src="../src/assets/background/cloud4.svg" alt="" className='cloud4' />
                                </div>
                            </div>
                            <div className='nature'><img src="../src/assets/AuthAssets/authbackground.svg" alt="" /></div>
                        </div>
                    </div>
                    <div className='ideas_container' id='ideas_container'>
                        {viewIdeas}
                    </div>
                </div>
            </DefaultTemplate>
        </>
    );
}

export default IdeasPage;