import DefaultTemplate from "@/components/DefaultTemplate.jsx";
import "../pages/ProfilePage.scss";
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams ,useNavigate} from 'react-router-dom'

export default function UserPage() {
  const params = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(false);
  const [showContainer1, setShowContainer1] = useState(true);
  const [showContainer2, setShowContainer2] = useState(false);
  const [userRegistr, setUserRegistr] = useState("");
  const toggleContainer1 = () => {
    setShowContainer1(true);
    setShowContainer2(false);
  };
  const toggleContainer2 = () => {
    setShowContainer1(false);
    setShowContainer2(true);
  };


  useEffect(() => {
    const getUser = async () => {
      const access_token = localStorage.getItem('access_token');
      if (!access_token) {
        navigate('/login');
      } else {
        try {
          const response = await axios.get(`/regauth/user-search/${params.id}`, {
            headers: { 'Authorization': `Bearer ${access_token}` }
          });
          if (response.data.code) {
            localStorage.clear();
            setError('"Ваша сессия истекла. Пожалуйста, войдите снова, чтобы продолжить пользоваться нашими услугами.');
            navigate(`/login?error=${encodeURIComponent('auth')}`)
          } else {
            setUser(response.data)
            console.log(response.data)
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
    getUser();
  }, [])

  useEffect(() => {
    if (user.created_at) {
      // Remove the trailing 'Z' indicating UTC timezone
      const trimmedTimestamp = user.created_at.slice(0, -1);
      // Convert timestamp to a Date object
      const dateObject = new Date(trimmedTimestamp);
      // Format the date as per requirement (example format: MM/DD/YYYY)
      const formattedDate = `${dateObject.getMonth() + 1}/${dateObject.getDate()}/${dateObject.getFullYear()}`;
      // Update state with the formatted date
      setUserRegistr(formattedDate);
    }
  }, [user]);

  return (
    <>
      <DefaultTemplate>
        <div id="cabinet">
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
          <div id="cabinet_container">
            <br />
            <div id="user_container">
              <div id="name">
                <img id='user_picture' src="../src/assets/icons/user.svg" alt="" />
                <p id='user'>
                  {user.username}
                  <span id='real_name'>{user.name} {user.second_name}</span>
                </p>
              </div>
              <ul id="tags">
                {/* {user?.tags?.map((tag, index) => (<li key={index} className={`tag`}>{tag}</li>))} */}
                {user.tags}
              </ul>
            </div>
            <div className="data_container" style={{ display: showContainer1 ? 'flex' : 'none' }}>
              <button className="data_button">Данные</button>
              <button className="idea_button" onClick={toggleContainer2}>Идеи</button>
              <div className="data_section">
                <div className="data_block" style={{ backgroundColor: 'rgba(147,74,247,0.50)' }}>
                  <h1 className='data_header'>Данные</h1>
                  <p className='data'>
                    <img src="../src/assets/icons/calendar.svg" width={36} height={36} alt="" />
                    Зарегистрирован с {userRegistr}
                  </p>
                  <p className='data'>
                    <img src="../src/assets/icons/mail.svg" width={39} height={32} alt="" />
                    {user.email}
                  </p>
                </div>
                {user?.skills?.length > 0 && (
                  <div className="data_block" style={{ backgroundColor: 'rgba(251,184,0,0.50)' }}>
                    <h1 className='data_header'>Навыки</h1>
                    {/* {user.skills?.map((skill,index)=>(<p key={index} className='skill'>{skill}</p>))} */}
                    {user.skills}
                  </div>
                )}
              </div>
              <div className="data_section">
                {user?.works?.length > 0 && (
                  <div className="data_block" style={{ backgroundColor: 'rgba(251,184,0,0.50)' }}>
                    <h1 className='data_header'>Работы</h1>
                    {user.works.map((work, id) => (
                      <p key={id} className='link'>
                        <img style={{ borderRadius: '10px' }} width={40} height={40} src={work.logo} />
                        <a href={work.link}>{work.name}</a>
                      </p>
                    ))}
                  </div>
                )}
                {user?.socials?.length > 0 && (
                  <div className="data_block" style={{ backgroundColor: 'rgba(147,74,247,0.50)' }}>
                    <h1 className='data_header'>Контакты</h1>
                    <p className='link'>{user.phone_number}</p>
                    {user.socials.map((social, id) => (
                      <p key={id} className='link'>
                        <img style={{ borderRadius: '10px' }} width={40} height={40} src={social.logo} />
                        <a href={social.link}>{social.name}</a>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="data_container" style={{ display: showContainer2 ? 'flex' : 'none' }}>
              <button className="data_button purple" onClick={toggleContainer1}>Данные</button>
              <button className="idea_button yellow">Идеи</button>
              <div className="ideas_container">
                {user?.ideas?.map((idea, id) => (
                  <div key={id} className="idea_block">
                    <div className="idea" >
                      <h3 className='idea_name'>{idea.name}</h3>
                      <p className='idea_description'>{idea.description}</p>
                      <ul className='idea_tags'>
                        {/* {idea.tags.map((hashtag,index)=>(<a value={hashtag} key={index} className='idea_tag'>{hashtag}</a>))} */}
                      </ul>
                    </div>
                    <div className="idea_interactables">
                      <div className="idea_interactable" style={{ color: '#934AF7' }}>
                        <img width={40} height={34} src="../src/assets/icons/supported.svg" alt="" />
                        {idea.supporters_count}
                      </div>
                      <div className="idea_interactable"
                        style={{ color: '#DD403F' }}>
                        <img width={40} height={34} src="../src/assets/icons/liked.svg" alt="" />
                        {idea.likes}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DefaultTemplate>
    </>
  )
}
