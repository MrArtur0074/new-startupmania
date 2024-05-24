import { useState } from "react"
import DefaultTemplate from "@/components/DefaultTemplate.jsx";
import '../pages/TeamPage.scss'
import { useNavigate } from "react-router-dom";

const TeamPage = () => {
    const navigate = useNavigate()
    const [team, setTeam] = useState({
        name: 'Tech Innovators',
        description: 'Tech Innovators are a dynamic team pioneering Smart Home Solutions. With cutting-edge technology, they aim to revolutionize home automation, enhancing convenience, security, and energy efficiency. Their innovative approach promises a smarter, connected future for households.',
        logo: null,
        idea: 'Smart Home Solutions',
        ideaId: '3',
        leader: {
            id: 1,
            name: 'KAIMAKgaming',
            avatar: null
        },
        members: [
            {
                id: 1,
                name: 'KAIMAKgaming'
            }, {
                id: 2,
                name: 'Avatar'
            }, {
                id: 3,
                name: 'Bekxwt'
            }
        ]
    })
    return (
        <>
            <DefaultTemplate>
                <div id="team_page">
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
                    <div className="team_page_container">
                        <h1 className="team_page_name">{team.name}</h1>
                        <div className="logo_description_creator">
                            <img src="../../src/assets/icons/team_logo_none.svg" alt="" className="team_page_logo" />
                            <p className="team_page_description">
                                {team.description}
                            </p>
                            <div className="team_page_creator">
                                <img src="../../src/assets/icons/user.svg" alt="" />
                                <p onClick={()=>navigate(`/profile/${team.leader.id}`)}>{team.leader.name}</p>
                            </div>
                        </div>
                        <div className="team_page_idea">
                            Идея :<p className="team_page_idea_name" onClick={()=>navigate(`/idea/${team.ideaId}`)}>{team.idea}</p>
                        </div>
                        <ul className="team_page_members">
                            Участники :
                            {team.members.map((member,index)=>(
                                <li key={index} onClick={()=>navigate(`/profile/${member.id}`)} className="team_page_member">
                                    {member.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </DefaultTemplate>
        </>
    )
}

export default TeamPage
