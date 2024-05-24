import DefaultTemplate from '@/components/DefaultTemplate.jsx'
import { useContext, useState, useEffect } from 'react'
import { DateContext } from '@/App'
import '../pages/TournamentPage.scss'
import { useNavigate } from 'react-router-dom'
const TournamentPage = () => {
    const [date, setDate] = useContext(DateContext)
    const navigate = useNavigate()
    const [timeRemaining, setTimeRemaining] = useState()
    const [teams, setTeams] = useState([
        {
            name: "Tech Innovators",
            id: 1,
            points: 278,
        },
        {
            name: "Eco Warriors",
            id: 2,
            points: 270,
        },
        {
            name: "Health Guardians",
            id: 3,
            points: 251,
        }
    ])
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
        <>
            <DefaultTemplate>
                <div id='tournament_page'>
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
                    <div className="stage_time">
                        Времы До следующего Этапа : <p className='time_remaining'>{timeRemaining}</p>
                    </div>
                    <ol className="leaderboard">
                        <h1 className='leaderboard_title'>Таблица Лидеров</h1>
                        <div className='crown'><img src='../src/assets/icons/crown.svg' /></div>
                        {teams.map((team, index) => (
                            <li key={index} className='leaderboard_team' id={index === 0 ? "first_place" : ""}>
                                <h3 className='leaderboard_team_name' onClick={() => navigate(`/team/${team.id}`)}>
                                    {team.name}
                                </h3>
                                <div className='leaderboard_team_points'>
                                    {team.points}
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </DefaultTemplate>
        </>
    )
}

export default TournamentPage
