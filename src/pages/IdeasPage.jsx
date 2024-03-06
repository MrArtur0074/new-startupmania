import {useContext, useEffect, useState} from 'react';
import DefaultTemplate from "@/components/DefaultTemplate.jsx";
import "../pages/IdeasPage.scss";
import filter from "@/assets/icons/filter.svg";
import {getAllIdeas} from "@/app/api.js";
import {UserContext} from "@/App.jsx";
import axios from 'axios';

function IdeasPage() {
    const [user, setUser] = useContext(UserContext);
    const [tab, setTab] = useState('all');
    const [ideas, setIdeas] = useState([]);
    const [create,setCreate] = useState (false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredIdeas, setFilteredIdeas] = useState([]);

    const showCreate = () =>{
        {create?setCreate(false):setCreate(true)}
    }
    const toggleIsLiked = (ideaId) => {
    setIdeaBlocks(prevBlocks => 
        prevBlocks.map(ideaBlock =>
        ideaBlock.id === ideaId ? { ...ideaBlock, user_liked: !ideaBlock.user_liked } : ideaBlock
        ));
    };
    const toggleIsSupported = (ideaId) => {
    setIdeaBlocks(prevBlocks => 
        prevBlocks.map(ideaBlock =>
        ideaBlock.id === ideaId ? { ...ideaBlock, is_supported: !ideaBlock.is_supported } : ideaBlock
        )
    );
    };
    const handleLikeIdea = async (id) => {
    const access_token = localStorage.getItem('access_token');
        if (!access_token) {
        navigate('/login');
        } else {
    try {
        const response = await axios.post(`/api/v1/idea/ideas/${id}/like/`,{},{
        headers: {'Authorization': `Bearer ${access_token}`}
        });
        if (response.data.code){
        localStorage.clear();
        setError('"Ваша сессия истекла. Пожалуйста, войдите снова, чтобы продолжить пользоваться нашими услугами.');
        navigate(`/login?error=${encodeURIComponent('auth')}`)
        } else {
        toggleIsLiked(id)
        };
    } catch (error) {
        console.error('Не получилось сделать запрос', error);
    }}
    };
    const handleDislikeIdea = async (id) => {
    const access_token = localStorage.getItem('access_token');
        if (!access_token) {
        navigate('/login');
        } else {
    try {
        const response = await axios.post(`/api/v1/idea/ideas/${id}/delite-like/`,{},{
        headers: {'Authorization': `Bearer ${access_token}`}
        });
        if (response.data.code){
        localStorage.clear();
        setError('"Ваша сессия истекла. Пожалуйста, войдите снова, чтобы продолжить пользоваться нашими услугами.');
        navigate(`/login?error=${encodeURIComponent('auth')}`)
        } else {
        toggleIsLiked(id)
        };
    } catch (error) {
        console.error('Не получилось сделать запрос', error);
    }}
    };
    const handleSupportIdea = async (id) => {
    const access_token = localStorage.getItem('access_token');
        if (!access_token) {
        navigate('/login');
        } else {
    try {
        const response = await axios.post(`/api/v1/idea/ideas/${id}/supporter/`,{},{
        headers: {'Authorization': `Bearer ${access_token}`}
        });
        if (response.data.code){
        localStorage.clear();
        setError('"Ваша сессия истекла. Пожалуйста, войдите снова, чтобы продолжить пользоваться нашими услугами.');
        navigate(`/login?error=${encodeURIComponent('auth')}`)
        } else {
        toggleIsSupported(id)
        };
    } catch (error) {
        console.error('Не получилось сделать запрос', error);
    }}
    };
    const handleStopSupportIdea = async (id) => {
    const access_token = localStorage.getItem('access_token');
        if (!access_token) {
        console.log('sadsadas')
        navigate('/login');
        } else {
    try {
        const response = await axios.post(`/api/v1/idea/ideas/${id}/supporter-decline/`,{},{
        headers: {'Authorization': `Bearer ${access_token}`}
        });
        if (response.data.code){
        localStorage.clear();
        setError('"Ваша сессия истекла. Пожалуйста, войдите снова, чтобы продолжить пользоваться нашими услугами.');
        navigate(`/login?error=${encodeURIComponent('auth')}`)
        } else {
        toggleIsSupported(id)
        };
    } catch (error) {
        console.error('Не получилось сделать запрос', error);
    }}
    };

    const viewIdeas = filteredIdeas.map((ideaBlock, index) => {
        return (
            <div className='idea_block ideas_block' key={ideaBlock.id}>
            <div className='idea'>
              <h3 className='idea_name'>{ideaBlock.name}</h3>
              <p className='idea_description'>{ideaBlock.description}</p>
              {/* <ul className='idea_tags'>
                  {ideaBlock.hashtags.map((hashtag,index)=>(<a value={hashtag} key={index} className='idea_tag'>{hashtag}</a>))}
              </ul> */}
            </div>
            <div className='idea_buttons'>
              {ideaBlock.user_liked?
                <div className='idea_block_button' onClick={() => handleDislikeIdea(ideaBlock.id)} style={{color:'rgb(221, 64, 63)'}}>
                <img className='idea_button_img' src="../src/assets/icons/liked.svg" alt="" />
                {ideaBlock.likes}
                </div>
                :
                <div className='idea_block_button' onClick={() => handleLikeIdea(ideaBlock.id)} style={{color:'rgb(221, 64, 63)'}}>
                <img className='idea_button_img' src="../src/assets/icons/like.svg" alt="" />
                {ideaBlock.likes}
                </div>
              }
              {ideaBlock.is_supported?
                <div className='idea_block_button' onClick={() => handleStopSupportIdea(ideaBlock.id)} style={{color:'rgb(147, 74, 247)'}}>
                <img className='idea_button_img' src="../src/assets/icons/supported.svg" alt="" />
                {typeof ideaBlock.supporters === 'string' ? ideaBlock.supporters.split(',').map(name => name.trim()).length : 0}
                </div>
                :
                <div className='idea_block_button' onClick={() => handleSupportIdea(ideaBlock.id)} style={{color:'rgb(147, 74, 247)'}}>
                <img className='idea_button_img' src="../src/assets/icons/support.svg" alt="" />
                {typeof ideaBlock.supporters === 'string' ? ideaBlock.supporters.split(',').map(name => name.trim()).length : 0}
                </div>
              }
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
                    <div className='sky'><img src="../src/assets/background/sky.svg" alt=""/></div>
                    <div className='clouds'>
                        <div className="cloud_container">
                            <img src="../src/assets/background/cloud1.svg" alt="" className='cloud1'/>
                            <img src="../src/assets/background/cloud2.svg" alt="" className='cloud2'/>
                            <img src="../src/assets/background/cloud3.svg" alt="" className='cloud3'/>
                            <img src="../src/assets/background/cloud4.svg" alt="" className='cloud4'/>
                        </div>
                    </div>
                    <div className='nature'><img src="../src/assets/AuthAssets/authbackground.svg" alt=""/></div>
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
                            <div onClick={() => setTab('all')} className={`tab_filter ${tab === 'all'?'active_tab' : ''}`}>Все идеи</div>
                            <div onClick={() => setTab('my')} className={`tab_filter  ${tab === 'my'?'active_tab' : ''}`}>Мои идеи</div>
                            <div className='option'>
                                <img src={filter}/>
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