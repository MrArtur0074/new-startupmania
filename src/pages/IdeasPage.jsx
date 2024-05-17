import { useContext, useEffect, useState } from 'react';
import DefaultTemplate from "@/components/DefaultTemplate.jsx";
import "../pages/IdeasPage.scss";
import filter from "@/assets/icons/filter.svg";
import { getAllIdeas, unAuthNav } from "@/app/api.js";
import { UserContext } from "@/App.jsx";
import Idea from "@/components/ideas/Idea.jsx";
import { createIdea } from '../app/api';

function IdeasPage() {
    const [user, setUser] = useContext(UserContext);
    const [tab, setTab] = useState('all');
    const [ideas, setIdeas] = useState([]);
    const [create, setCreate] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredIdeas, setFilteredIdeas] = useState([]);
    const [createMessage, setCreateMessage] = useState(false); const [selectedTag, setSelectedTag] = useState('');
    const [tagsArray, setTagsArray] = useState([]);
    const [filterShow, setFilterShow] = useState()
    const maxDescLength = 300;
    const maxNameLength = 30;
    const maxTagLength = 25;
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
    const handleTagChange = (e) => {
        const inputText = e.target.value;
        if (inputText.length <= maxTagLength) {
            handleChange(e)
        }
    };
    const access_token = localStorage.getItem('access_token');
    const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        tag: ''
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!access_token) {
            navigate('/login');
        } else {
            try {
                const response = createIdea(access_token, formData)
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
    const showCreate = () => {
        { create ? setCreate(false) : setCreate(true) }
    }
    const showFilter = () => {
        { filterShow ? setFilterShow(false) : setFilterShow(true) }
    }
    const viewIdeas = filteredIdeas.map((ideaBlock, index) => {
        return (
            <Idea key={index} idea={ideaBlock} />
        );
    });
    useEffect(() => {
        const ideasWithTag = ideas.filter(idea => idea.tag.trim() !== '');
        const newTagsSet = new Set(ideasWithTag.map(idea => idea.tag));
        const newTagsArray = Array.from(newTagsSet);
        setTagsArray(newTagsArray);
    }, [ideas]);
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
        if (selectedTag.trim() === '') {
            setFilteredIdeas(ideas);
        } else {
            setFilteredIdeas(
                ideas.filter(ideaBlock => ideaBlock.tag === selectedTag)
            );
        }
    }, [ideas, selectedTag]);
    const handleTagClick = (tag) => {
        setSelectedTag(tag);
    };
    useEffect(() => {
        getAllIdeas(access_token).then((response) => {
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
                    <div className="create_idea_background" style={{ display: create ? 'block' : 'none' }}></div>
                    <div className="create_idea_container" style={{ display: create ? 'flex' : 'none' }}>
                        <form className='create_idea_form' style={{ display: createMessage ? 'none' : 'flex' }} onSubmit={handleSubmit}>
                            <div style={{ position: 'absolute', top: '15px', right: '15px', width: '30px', height: '30px' }} onClick={showCreate}>
                                <img src="../src/assets/icons/cross-fucking-normal.svg" style={{ width: '100%', height: '100%' }} alt="" />
                            </div>
                            <input type="text"
                                value={formData.name} name='name' onChange={handleNameChange}
                                placeholder='Название Идеи' className='idea_name_create' />
                            <div className='character_limit'>{maxNameLength - formData.name.length}/{maxNameLength}</div>
                            <textarea type="text"
                                value={formData.description} name='description' onChange={handleDescChange}
                                placeholder='Описание Идеи' className='idea_desc_create' />
                            <div className='character_limit'>{maxDescLength - formData.description.length}/{maxDescLength}</div>
                            <input type="text"
                                value={formData.tag} name='tag' onChange={handleTagChange}
                                placeholder='Тег' className='idea_tag_create' />
                            <div className='character_limit'>{maxTagLength - formData.tag.length}/{maxTagLength}</div>
                            <button type='submit'>Создать Идею</button>
                        </form>
                    </div>
                    <div className='filter_window' style={{ display: filterShow ? 'flex' : 'none' }}>
                        <div onClick={() => setSelectedTag('')}>CLEAR</div>
                        {tagsArray.map((tag, index) => (
                            <p key={index} onClick={() => handleTagClick(tag)}>
                                {tag}
                            </p>
                        ))}
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
                            <input
                                type="text"
                                value={selectedTag}
                                placeholder='Тег'
                                className='selected_tag'
                                readOnly
                            />
                            <div className='option' onClick={showFilter}>
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