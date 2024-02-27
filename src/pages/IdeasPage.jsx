import {useContext, useEffect, useState} from 'react';
import DefaultTemplate from "@/components/DefaultTemplate.jsx";
import Navbar from "@/components/navbar/Navbar.jsx";
import styles from "@/pages/IdeasPage.module.css";
import background from "@/assets/background/mainpage.png";
import filter from "@/assets/icons/filter.png";
import {getAllIdeas} from "@/app/api.js";
import {UserContext} from "@/App.jsx";

function IdeasPage() {
    const [user, setUser] = useContext(UserContext);
    const [tab, setTab] = useState('all');
    const [ideas, setIdeas] = useState([]);
    const [filteredIdeas, setFilteredIdeas] = useState([]);
    const viewIdeas = filteredIdeas.map((idea, index) => {
        return (
            <div key={index} className={styles.idea}>
                <div className={styles.ideaTitle}>{idea.title}</div>
                <div className={styles.ideaDescription}>{idea.description}</div>
                <div className={styles.ideaFooter}>
                    <div className={styles.ideaAuthor}>{idea.created_by}</div>
                    <div className={styles.ideaDate}>{idea.created_at}</div>
                </div>
            </div>
        );
    });

    useEffect(() => {
        filterIdeas();
    }, [tab]);

    console.log(ideas)

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
            setFilteredIdeas(ideas.filter((idea) => user.id === idea.created_by));
        }
    }

    return (
        <>
            <DefaultTemplate>
                <div className={styles.containter} style={{backgroundImage: `url(${background})`}}>
                    <div className={styles.wrapper}>
                        <h1 className={styles.h1}>Идеи</h1>
                        <div className={styles.filter}>
                            <div className={styles.left}>
                                <div onClick={() => setTab('all')} className={`${styles.all} ${tab === 'all' ? styles.active : ''}`}>Все идеи</div>
                                <div onClick={() => setTab('my')} className={`${styles.my} ${tab === 'my' ? styles.active : ''}`}>Мои идеи</div>
                            </div>
                            <div className={styles.right}>
                                <div className={styles.searchDiv}>
                                    <input type="text" placeholder="Поиск по идеям" className={styles.search}/>
                                </div>
                                <div className={styles.option}>
                                    <img src={filter}/>
                                </div>
                            </div>
                        </div>
                        <div className={styles.ideasList}>
                            {viewIdeas}
                        </div>
                    </div>
                </div>
            </DefaultTemplate>
            <Navbar/>
        </>
);
}

export default IdeasPage;