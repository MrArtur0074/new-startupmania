import { useContext, useEffect, useState } from 'react';
import DefaultTemplate from "@/components/DefaultTemplate.jsx";
import "../pages/IdeasPage.scss";
import filter from "@/assets/icons/filter.svg";
import { getAllIdeas } from "@/app/api.js";
import { UserContext } from "@/App.jsx";
import axios from 'axios';
import liked from '@/assets/icons/liked.svg'
import like from '@/assets/icons/like.svg'
import supported from '@/assets/icons/supported.svg'
import support from '@/assets/icons/support.svg'

function IdeasPage() {
    const [user, setUser] = useContext(UserContext);
    const [tab, setTab] = useState('all');
    const [ideas, setIdeas] = useState([]);
    const [create, setCreate] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredIdeas, setFilteredIdeas] = useState([]);
    const access_token = localStorage.getItem('access_token');
    const unAuthNav = () => {
        localStorage.removeItem('access_token','id');
        setError('"Ваша сессия истекла. Пожалуйста, войдите снова, чтобы продолжить пользоваться нашими услугами.');
        navigate(`/login?error=${encodeURIComponent('auth')}`)
    }
    const showCreate = () => {
        { create ? setCreate(false) : setCreate(true) }
    }
    const handleLikeClick = (id) => {
        console.log(id)
        setFilteredIdeas(prevIdeas => {
            return prevIdeas.map(idea => {
                if (idea.id === id) {
                    if (idea.user_liked) {
                        handleDislikeIdea(id)
                    } else {
                        handleLikeIdea(id)
                    }
                    return {
                        ...idea,
                        user_liked: !idea.user_liked,
                        likes: idea.user_liked ? idea.likes - 1 : idea.likes + 1
                    };
                }
                return idea;
            });
        });
    }
    const handleSupportClick = (id) => {
        setFilteredIdeas(prevIdeas => {
            return prevIdeas.map(idea => {
                if (idea.id === id) {
                    if (idea.is_supported) {
                        handleStopSupportIdea(id)
                    } else {
                        handleSupportIdea(id)
                    }
                    return {
                        ...idea,
                        is_supported: !idea.is_supported,
                        likes: idea.is_supported ? idea.supporters_count - 1 : idea.supporters_count + 1
                    };
                }
                return idea;
            });
        });
    }
    const handleLikeIdea = async (id) => {
        if (!access_token) {
            navigate('/login');
        } else {
            try {
                const response = await axios.post(`/idea/ideas/${id}/like/`, {}, {
                    headers: { 'Authorization': `Bearer ${access_token}` }
                });
                if (response.data.code){unAuthNav()}
            } catch (error) {
                console.error('Не получилось сделать запрос', error);
            }
        }
    };

    const handleDislikeIdea = async (id) => {
        if (!access_token) {
            navigate('/login');
        } else {
            try {
                const response = await axios.post(`/idea/ideas/${id}/delite-like/`, {}, {
                    headers: { 'Authorization': `Bearer ${access_token}` }
                });
                if (response.data.code){unAuthNav()}
            } catch (error) {
                console.error('Не получилось сделать запрос', error);
            }
        }
    };
    const handleSupportIdea = async (id) => {
        if (!access_token) {
            navigate('/login');
        } else {
            try {
                const response = await axios.post(`/idea/ideas/${id}/supporter/`, {}, {
                    headers: { 'Authorization': `Bearer ${access_token}` }
                });
                if (response.data.code){unAuthNav()}
            } catch (error) {
                console.error('Не получилось сделать запрос', error);
            }
        }
    };
    const handleStopSupportIdea = async (id) => {
        if (!access_token) {
            navigate('/login');
        } else {
            try {
                const response = await axios.post(`/idea/ideas/${id}/supporter-decline/`, {}, {
                    headers: { 'Authorization': `Bearer ${access_token}` }
                });
                if (response.data.code){unAuthNav()}
            } catch (error) {
                console.error('Не получилось сделать запрос', error);
            }
        }
    };

    const viewIdeas = filteredIdeas.map((ideaBlock, index) => {
        return (
            <div className='idea_block ideas_block' key={ideaBlock.id}>
                <div className='idea'>
                    <h3 className='idea_name'>{ideaBlock.name}</h3>
                    <p className='idea_description'>{ideaBlock.description}</p>
                    {/* <ul className='idea_tags'>{ideaBlock.hashtags.map((hashtag,index)=>(<a value={hashtag} key={index} className='idea_tag'>{hashtag}</a>))}</ul> */}
                </div>
                <div className='idea_buttons'>
                    <div className='idea_block_button' style={{ color: 'rgb(221, 64, 63)' }} >
                        <img className='idea_button_img' onClick={() => handleLikeClick(ideaBlock.id)} src={ideaBlock.user_liked ? liked : like} alt="" />
                        {ideaBlock.likes}
                    </div>
                    <div className='idea_block_button' style={{ color: 'rgb(147, 74, 247)' }} >
                        <img className='idea_button_img' onClick={() => handleSupportClick(ideaBlock.id)} src={ideaBlock.is_supported ? supported : support} alt="" />
                        {ideaBlock.supporters_count}
                    </div>
                    <a className='idea_view' href='/idea'>Просмотр</a>
                </div>
            </div>
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
            console.log(user)
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
                    <div className='ideas_header'>
                        <h1 className='ideas_title'>Идеи</h1>
                        <div className="search_container">
                            <button className='create_idea_button' onClick={showCreate}>Создать Идею</button>
                            <input className='ideas_search'
                                type="text"
                                placeholder="Поиск..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div id="filter_container">
                            <div onClick={() => setTab('all')} className={`tab_filter ${tab === 'all' ? 'active_tab' : ''}`}>Все идеи</div>
                            <div onClick={() => setTab('my')} className={`tab_filter  ${tab === 'my' ? 'active_tab' : ''}`}>Мои идеи</div>
                            <div className='option'>
                                <img src={filter} />
                            </div>
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