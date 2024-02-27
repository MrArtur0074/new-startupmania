import React from 'react';
import DefaultTemplate from "@/components/DefaultTemplate.jsx";
import styles from "@/pages/HomePage.module.css";
import background from "@/assets/background/mainpage.png";
import Navbar from "@/components/navbar/Navbar.jsx";

const HomePage = () => {
    // Состояние даты 10 марта
    const [date, setDate] = React.useState(new Date('2024-03-10T00:00:00'));
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
                <div className={styles.containter} style={{backgroundImage: `url(${background})`}}>
                    <div className={styles.wrapper}>
                        <div className={styles.upperBlock}>
                            <div>
                                <span className={styles.title}>STARTUP</span>
                            </div>
                            <div className={styles.time}>
                                <div className={styles.timeTitle}>ВРЕМЯ</div>
                                <div className={styles.underTimeTitle}>ПРОВЕДЕНИЯ</div>
                            </div>
                        </div>
                        <div className={styles.underBlock}>
                            <div className={styles.timeBlock}>
                                <div className={styles.days}>
                                    <div>{days}</div>
                                    <div>
                                        <span className={styles.orangeText}>Дней</span>
                                    </div>
                                </div>
                                <div className={styles.hours}>
                                    <div>{hours}</div>
                                    <div>
                                        <span className={styles.orangeText}>Часов</span>
                                    </div>
                                </div>
                                <div className={styles.minutes}>
                                    <div>{minutes}</div>
                                    <div>
                                        <span className={styles.orangeText}>Минут</span>
                                    </div>
                                </div>
                                <div className={styles.seconds}>
                                    <div>{seconds}</div>
                                    <div>
                                        <span className={styles.orangeText}>Секунд</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <span className={styles.title}>STARTUP</span>
                            </div>
                        </div>
                    </div>
                </div>
            </DefaultTemplate>
            <Navbar />
        </>
    );
}

export default HomePage