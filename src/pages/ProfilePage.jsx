import React, {useContext} from 'react';
import Navbar from "@/components/navbar/Navbar.jsx";
import DefaultTemplate from "@/components/DefaultTemplate.jsx";
import styles from "@/pages/ProfilePage.module.css";
import background from "@/assets/background/login.png";
import avatar from "@/assets/icons/user.png";
import {UserContext} from "@/App.jsx";

function ProfilePage() {
    const [user, setUser] = useContext(UserContext);
    console.log(user)

    return (
        <>
            <DefaultTemplate>
                <div className={styles.containter} style={{backgroundImage: `url(${background})`}}>
                    <div className={styles.wrapper}>
                        <h1 className={styles.h1}>Ваш профиль</h1>
                        <div className={styles.usernameInfo}>
                            <div className={styles.image}>
                                <img src={avatar} alt="avatar" className={styles.avatar}/>
                            </div>
                            <div className={styles.login}>
                                <div className={styles.username}>{user?.username}</div>
                                <div className={styles.firstname}>{user?.name} {user?.second_name}</div>
                            </div>
                            <div className={styles.tags}>
                                <div className={styles.tagItem}>UX/UI designer</div>
                                <div className={styles.tagItem}>Frontend разработчик</div>
                            </div>
                        </div>
                    </div>
                </div>
            </DefaultTemplate>
            <Navbar/>
        </>
    );
}

export default ProfilePage;