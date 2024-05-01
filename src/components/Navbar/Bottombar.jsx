import { useState , useEffect , useContext} from 'react'
import { DateContext } from '../../App'
import styles from '../Navbar/SideBar.module.scss'
import { Link } from 'react-router-dom'

const Bottombar = () => {
    const [hub, setHub] = useState(false)
    const [date, setDate] = useContext(DateContext)
    const [timeRemaining,setTimeRemaining] = useState()
    const hub_toggle = () => {
        setHub(prevState => !prevState)
    }
    useEffect(() => {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = date - now;
  
        setTimeRemaining(distance);
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
    return (
        <div className={styles.bottombar}>
            <div className={styles.hub_window}
                style={{ display: hub ? 'flex' : 'none' }}>
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
                        <p style={{whiteSpace:'pre-line'}}>Список Участников</p>
                    </li>
                    <li className={styles.hub_link}>
                        <Link href='/about_us'>
                            <img className={styles.hub_link_img} src="../src/assets/icons/about.svg" alt="" />
                        </Link>
                        <p>О Нас</p>
                    </li>
                </ul>
                <div className={styles.hub_event}></div>
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
