import DefaultTemplate from "@/components/DefaultTemplate.jsx";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "@/App.jsx";
import { createTeam, getAllTeams, getAllIdeas, getThisIdea, getAllUsers } from "../app/api";
import Team from "@/components/teams/Team.jsx";
import '../pages/TeamsPage.scss'
const TeamsPage = () => {
    const access_token = localStorage.getItem('access_token')
    const [user, setUser] = useContext(UserContext);
    const [tab, setTab] = useState('all');
    const [create, setCreate] = useState(false);
    const [teams, setTeams] = useState([])
    const [filteredTeams, setFilteredTeams] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [createMessage, setCreateMessage] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showSupport, setShowSupport] = useState(false);
    const [supporters, setSupporters] = useState([]);
    const [ideas, setIdeas] = useState([])
    const [ideaforsup,setideaforsup]=useState('')
    const [ideafromback,setideafromback]=useState('')
    const [selectedIdea, setSelectedIdea] = useState('')
    const [selectedSupporters, setSelectedSupporters] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        idea: '',
        supporters: [],
    });
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
    const showCreate = () => {
        { create ? setCreate(false) : setCreate(true) }
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleIdeaSelect = (selectedIdeaId, idea_name) => {
        setFormData({
            ...formData,
            idea: selectedIdeaId,
        });
        setShowModal(false);
        setSelectedIdea(idea_name)
    };
    useEffect(() => {
        getAllIdeas(access_token).then((response) => {
            setIdeas(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, [])
    const chooseHandler = (which) => {
        if (which === 1) {
            if (showModal) {
                setShowModal(false);
                setShowSupport(false);
            } else {
                setShowModal(true);
                setShowSupport(false);
            }
        } else {
            if (showSupport) {
                setShowModal(false);
                setShowSupport(false);
            } else {
                setShowModal(false);
                setShowSupport(true);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!access_token) {
            navigate('/login');
        } else {
            try {
                const response = createTeam(access_token, formData)
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };
    const viewTeams = filteredTeams.map((teamBlock, index) => {
        return (
            <Team key={index} team={teamBlock} />
        );
    });
    useEffect(() => {
        getAllTeams(access_token).then((response) => {
            setTeams(response.data);
            setFilteredTeams(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, [])
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredTeams(teams);
        } else {
            setFilteredTeams(
                teams.filter(teamBlock =>
                    teamBlock.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }
    }, [teams, searchQuery]);

    useEffect(() => {
        if (selectedIdea) {
            const response = getThisIdea(access_token, formData.idea)
            if(response) {
                setideafromback (response)
                setideaforsup (ideafromback.data)   
            }
            const fetchData = async () => {
                try {
                    const allUsers = getAllUsers(access_token);
                    const filteredSupporters = allUsers.filter(user => ideaforsup.supporters.includes(user.id));
                    setSupporters(filteredSupporters);
                } catch (error) {
                    console.error('Error fetching users:', error);
                }
            };
            if (ideaforsup) {
                fetchData()
                console.log(ideaforsup)
            }
        }
    }, [selectedIdea]);
    const handleSupportSelect = (supporterId, supporterName) => {
        setFormData({
            ...formData,
            supporters: [...formData.supporters, supporterId],
        });
        setSelectedSupporters([...selectedSupporters, supporterName]);
    };
    return (
        <>
            <DefaultTemplate>
                <div className="teams">
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
                        <form className='create_team_form' style={{ display: createMessage ? 'none' : 'flex' }} onSubmit={handleSubmit}>
                            <div style={{ position: 'absolute', top: '15px', right: '15px', width: '30px', height: '30px' }} onClick={showCreate}>
                                <img src="../src/assets/icons/cross-fucking-normal.svg" style={{ width: '100%', height: '100%' }} alt="" />
                            </div>
                            <input type="text"
                                value={formData.name} name='name' onChange={handleNameChange}
                                placeholder='Название Вашей Команды' className='team_name_create team_input_create' />
                            <div className='team_character_limit'>{maxNameLength - formData.name.length}/{maxNameLength}</div>
                            <textarea type="text"
                                value={formData.description} name='description' onChange={handleDescChange}
                                placeholder='Описание Вашей Команды' className='team_desc_create team_input_create' />
                            <div className='team_character_limit'>{maxDescLength - formData.description.length}/{maxDescLength}</div>
                            <p style={{ cursor: 'default' }}>Выбранная Идея : {selectedIdea}</p>
                            <div className="choose_carrier">
                                <div onClick={() => chooseHandler(1)}
                                    className="choose_idea">
                                    {showModal && !showSupport ? 'Закрыть' : 'Выбрать Идею'}
                                </div>
                                <div onClick={() => chooseHandler(2)}
                                    className="choose_idea">
                                    {showSupport && !showModal ? 'Закрыть' : 'Выбрать Участников'}
                                </div>
                            </div>
                            <div><p onClick={()=>console.log(ideaforsup)}>ideaforsup</p><p onClick={()=>console.log(ideafromback)}>ideafromback</p></div>
                            {showModal && (
                                <ul className="modal team_input_create">
                                    {ideas.map(idea => (
                                        <li key={idea.id} onClick={() => handleIdeaSelect(idea.id, idea.name)}>
                                            {idea.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {showSupport && (
                                <ul className="modal team_input_create">
                                    {supporters.map(supporter => (
                                        <li key={supporter.id} onClick={() => handleSupportSelect(supporter.id, supporter.name)}>
                                            {supporter.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <button type='submit'>Создать Команду</button>
                        </form>
                    </div>
                    <div className="teams_header">
                        <input className='ideas_search'
                            type="text"
                            placeholder="Поиск..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                        <button className='create_idea_button' onClick={showCreate} >Создать Команду</button>
                    </div>
                    <div className="teams_container">
                        {viewTeams}
                    </div>
                </div>
            </DefaultTemplate>
        </>
    )
}

export default TeamsPage
