import styles from '../Navbar/SideBar.module.scss'
import React, { useState, useContext } from 'react';
import { UserContext } from '../../App.jsx';


const SideBar = () => {
const [user, setuser] = useContext(UserContext)
const [translate, setTranslate] = useState(false);
const [isAnimating, setIsAnimating] = useState(false);
const handleButtonClick = () => {
  {isAnimating?setIsAnimating(false):setIsAnimating(true)};
  {translate?setTranslate(false):setTranslate(true)};
};
const animationStyles = {
  animationName:isAnimating?'side-slide-animation':'side-slide-animation-reverse',animationDuration:'1s',animationFillMode:'forwards',
};
  return (
    <div className={styles.sidebar} style={{ transform: translate ? 'translateX(250px)' : 'translateX(0)' }}>
      <div className={styles.sidebar_container}>
        <a className={styles.logo_container} style={{cursor:'pointer'}} href='/'>
          <img src="../src/assets/icons/logo.svg" alt="" />
        </a>
        {user &&
        (<ul className={styles.nav}>
          {items?.map((item, index) => (
            <li className={styles.nav_element} key={index}>
              <a className={styles.nav_link} href={item.href}>
                <img className={styles.nav_logo} src={item.img} alt={`${item.alt} Icon`}/>
                {item.title}
              </a>
            </li>
          ))}
        </ul>)
        }
        <div className={styles.profile_out}>
          {user?
          (<a className={styles.nav_link} href="/login" onClick={() => localStorage.clear()}>
            <img className={styles.nav_logo} src='../src/assets/icons/signout.svg' alt='<' />
            Выйти
          </a>
          ):(
          <a className={styles.nav_link} href="/login">
            <img className={styles.nav_logo} src='../src/assets/icons/signin.svg' alt='>'/>
            Войти
          </a>
          )}
        </div>
      </div>
      <div className={styles.sidebar_slider} onClick={handleButtonClick}>
        <img style={animationStyles} src="../src/assets/icons/side_slide.svg" alt="<" height={24} width={15}/>
      </div>
      <div className={styles.topbar}>
        <div className={styles.topbar_container}>
          <img className={styles.topbar_logo} src="../src/assets/icons/logo.svg" alt="" />
          {user?(<a href='cabinet' className={styles.profile_top}>
            <span>Профиль</span>
            <img width={45} height={45} src="../src/assets/icons/user.svg" alt="" />
          </a>):(<a href='login' className={styles.profile_top}>
            <span>Войти</span>
            <img width={35} height={35} src="../src/assets/icons/signin.svg" alt="" />
          </a>)}
        </div>
      </div>
    </div>
  )
}

export default SideBar

const items = [
  { title: 'События', img :'../src/assets/icons/event.svg', alt :'h', href: '/events' },
  { title: 'Профиль', img :'../src/assets/icons/user.svg', alt :'t', href:'/cabinet' },
  { title: 'Уведомления', img :'../src/assets/icons/notification.svg', alt :'t', href:'/notifications' },
  { title: 'Сообщения', img :'../src/assets/icons/messages.svg', alt :'ul', href: '/messages' },
  { title: 'Идеи', img :'../src/assets/icons/ideas.svg', alt :'i', href: '/ideas' },
  { title: 'Команды', img :'../src/assets/icons/team.svg', alt :'i', href: '/teams' },
  { title: 'Друзья', img :'../src/assets/icons/friends.svg', alt :'i', href: '/friends' },
]