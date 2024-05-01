import React, { useContext } from 'react';
import DefaultTemplate from "@/components/DefaultTemplate.jsx";
import styles from "@/pages/HomePage.module.css";
import "@fontsource/exo-2/900.css";
import { DateContext } from '../App';

const HomePage = () => {
    const [date, setDate] = useContext(DateContext)
    const [days, setDays] = React.useState(0);
    const [hours, setHours] = React.useState(0);
    const [minutes, setMinutes] = React.useState(0);
    const [seconds, setSeconds] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = date - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setDays(days);
            setHours(hours);
            setMinutes(minutes);
            setSeconds(seconds);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <DefaultTemplate>
                <div className={styles.main}>
                    <div className={styles.background}>
                        <div className={styles.sky}><img src="../src/assets/background/sky.svg" alt=""/></div>
                        <div className={styles.mountains}><img src="../src/assets/background/mountains.svg" alt=""/></div>
                        <div className={styles.forest}><img src="../src/assets/background/forest.svg" alt="" /></div>
                        <div className={styles.clouds}>
                            <div className={styles.cloud_container}>
                                <img src="../src/assets/background/cloud1.svg" alt="" className={styles.cloud1}/>
                                <img src="../src/assets/background/cloud2.svg" alt="" className={styles.cloud2}/>
                                <img src="../src/assets/background/cloud3.svg" alt="" className={styles.cloud3}/>
                                <img src="../src/assets/background/cloud4.svg" alt="" className={styles.cloud4}/>
                            </div>
                        </div>
                        <div className={styles.clouds2}>
                            <div className={styles.cloud_container}>
                                <img src="../src/assets/background/cloud1.svg" alt="" className={styles.cloud5}/>
                                <img src="../src/assets/background/cloud2.svg" alt="" className={styles.cloud6}/>
                                <img src="../src/assets/background/cloud4.svg" alt="" className={styles.cloud7}/>
                                <img src="../src/assets/background/cloud3.svg" alt="" className={styles.cloud8}/>
                            </div>
                        </div>
                    </div>
                    <div className={styles.title_container}>
                        <div className={styles.title_text}>
                            <p className={styles.startup}>STARTUP</p>
                            <p className={styles.maniya}>МАНИЯ</p>
                            <p className={styles.event_time}><span className={styles.time}>ВРЕМЯ</span>ПРОВЕДЕНИЯ:</p>
                            <div className={styles.timer}>
                                <div className={styles.days}>{days}<p className={styles.timer_text}>ДНЕЙ</p></div>
                                <div className={styles.hours}>{hours}<p className={styles.timer_text}>ЧАСОВ</p></div>
                                <div className={styles.minutes}>{minutes}<p className={styles.timer_text}>МИНУТ</p></div>
                                <div className={styles.seconds}>{seconds}<p className={styles.timer_text}>СЕКУНД</p></div>
                            </div>
                        </div>
                        <br/>
                    </div>
                </div>
            </DefaultTemplate>
        </>
    );
}

export default HomePage