import { useState, useEffect, useContext } from 'react'
import { DateContext, UserContext } from '../../App'
import styles from '../Navbar/SideBar.module.scss'
import { Link } from 'react-router-dom'

const Bottombar = () => {
    const [hub, setHub] = useState(false)
    const [date, setDate] = useContext(DateContext)
    const [user, setUser] = useContext(UserContext)
    const [timeRemaining, setTimeRemaining] = useState()
    const hub_toggle = () => {
        setHub(prevState => !prevState)
    }
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = date - now;
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            const formattedTime = `${days}:${hours}:${minutes}:${seconds}`;
            setTimeRemaining(formattedTime)
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    return (
        <div className={styles.bottombar}>
            <div className={styles.hub_window}
                style={{ display: hub ? 'block' : 'none' }}>
                <div className={styles.hub_wrapper}>
                    <div className={styles.hub_title}>Hub</div>
                    <ul className={styles.hub_links}>
                        <li className={styles.hub_link}>
                            <Link href='/friends'>
                                <img className={styles.hub_link_img} src="../src/assets/icons/friends.svg" alt="" />
                            </Link>
                            <p>Друзья</p>
                        </li>
                        <li className={styles.hub_link}>
                            <Link href='/teams'>
                                <img className={styles.hub_link_img} src="../src/assets/icons/teams.svg" alt="" />
                            </Link>
                            <p>Команды</p>
                        </li>
                        <li className={styles.hub_link}>
                            <Link href='/participants'>
                                <img className={styles.hub_link_img} src="../src/assets/icons/participants.svg" alt="" />
                            </Link>
                            <p style={{ whiteSpace: 'pre-line' }}>Список Участников</p>
                        </li>
                        <li className={styles.hub_link}>
                            <Link href='/about_us'>
                                <img className={styles.hub_link_img} src="../src/assets/icons/about.svg" alt="" />
                            </Link>
                            <p>О Нас</p>
                        </li>
                    </ul>
                    <div className={styles.hub_event}>
                        <p style={{ color: '#DD403F' }}>Время Проведения:</p>
                        {timeRemaining}
                    </div>
                    {user.teams && user.teams.length > 0 && (
                        <div className={styles.hub_teams}>
                            <h2>Ваши Команды</h2>
                            <ul className={styles.hub_teams_list}>
                                {user.teams.map((team, id) => (
                                    <li className={styles.hub_link}>
                                        <Link href={`/team/${id}`}>
                                            <img className={styles.hub_link_img} src={team.team_logo} alt="" />
                                        </Link>
                                        <p>{team.name}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {user.ideas && user.ideas.length > 0 && (
                        <div className={styles.hub_ideas_container}>
                            <h2>Ваши Идеи:</h2>
                            {user?.ideas?.map((idea, id) => (
                                <div key={id} className="idea_block">
                                    <div className="idea">
                                        <h3 className='idea_name'>{idea.name}</h3>
                                        <p className='idea_description'>{idea.description}</p>
                                        <ul className='idea_tags'>
                                            {idea?.tags?.map((hashtag, index) => (<a value={hashtag} key={index} className='idea_tag'>{hashtag}</a>))}
                                        </ul>
                                    </div>
                                    <div className="idea_interactables">
                                        <div className="idea_interactable" style={{ color: '#934AF7' }}>
                                            <img width={40} height={34} src="../src/assets/icons/follow.svg" alt="" />
                                            {idea.supporters_count}
                                        </div>
                                        <div className="idea_interactable"
                                            style={{ color: '#DD403F' }}>
                                            <img width={40} height={34} src="../src/assets/icons/like.svg" alt="" />
                                            {idea.likes}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.bottombar_container}>
                <Link href="/ideas">
                    <img className={styles.bottom_icon} src="../src/assets/icons/ideas.svg" alt="" />
                </Link>
                <Link href="/search">
                    <img className={styles.bottom_icon} src="../src/assets/icons/bottomsearch.svg" alt="" />
                </Link>
                <Link href="/">
                    <img className={styles.bottom_icon} src="../src/assets/icons/event.svg" alt="" />
                </Link>
                <Link href="/notifications">
                    <img className={styles.bottom_icon} src="../src/assets/icons/notification.svg" alt="" />
                </Link>
                <img onClick={hub_toggle} className={styles.bottom_icon} src="../src/assets/icons/hub.svg" alt="" />
            </div>
        </div>
    )
}

export default Bottombar
