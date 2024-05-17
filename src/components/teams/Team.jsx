import view from "@/assets/icons/view.svg"
import viewPressed from "@/assets/icons/view-pressed.svg"
import { useEffect, useState } from "react";

function Team (props) {
    const [viewing, setViewing] = useState(null)
    const access_token = localStorage.getItem('access_token');
    const handleView = async () => {
        setViewing(true)
        setTimeout(() => {
            setViewing(false)
        }, 1000);
    }
    <div className='team_block' key={props.team?.id}>
            <div className='team'>
                <h3 className='team_name'>{props?.team?.name}</h3>
                <p className='team_description'>{props?.team?.description}</p>
                <p className='team_tag_prop team_descrription'>{props?.team?.tag}</p>
            </div>
            <div className='team_buttons'>
                <a className='team_view' href={`/team/${props?.team?.id}`} onClick={handleView}><img className='team_button_img' src={viewing ? viewPressed : view} alt="<->" /></a>
            </div>
        </div>
}

export default Team
