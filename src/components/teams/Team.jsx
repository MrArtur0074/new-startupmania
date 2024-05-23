import { useNavigate } from "react-router-dom";

function Team(props) {
    const access_token = localStorage.getItem('access_token');
    const navigate=useNavigate()
    return (
        <div className='team_block' key={props.team?.id}>
            <img onClick={()=>navigate(`/team/${props.team?.id}`)} className="team_logo" src="../../src/assets/icons/team_logo_none.svg" alt="" />
            <div className='team'>
                <h3 className='team_name'>{props?.team?.name}</h3>
                <p onClick={()=>navigate(`/idea/${props.team?.ideaId}`)} className='team_idea'><p style={{color:'#242424'}}>Идея: </p>{props?.team?.idea}</p>
            </div>
        </div>
    )
}

export default Team
