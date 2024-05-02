import { useContext, useEffect, useState } from 'react';
import DefaultTemplate from "@/components/DefaultTemplate.jsx";
import { UserContext } from "@/App.jsx";
import './IdeaPage.scss'
import { useParams } from 'react-router-dom';
import { getThisIdea, getThisUser } from '../app/api';
import creatorImageNull from '../../src/assets/icons/user.svg'

function IdeasPage() {
    const params = useParams()
    const [mainIdea, setMainIdea] = useState([])
    const [user, setUser] = useContext(UserContext);
    const [creatorProfile, setCreatorProfile] = useState('');
    const [creatorName, setCreatorName] = useState('')
    const access_token = localStorage.getItem('access_token')
    const [isCreatorSet, setIsCreatorSet] = useState(false);
    useEffect(() => {
        getThisIdea(access_token, params.id).then((response) => {
            setMainIdea(response.data)
            if (response?.data?.created_by) {
                getThisUser(access_token, response.data.created_by).then((response) => {
                    setCreatorProfile(response.data.avatar);
                    setCreatorName(response.data.name)
                    setIsCreatorSet(true)
                }).catch((error) => {
                    console.log(error);
                });
            } else {
                setCreatorProfile(null)
                setIsCreatorSet(true)
                setCreatorName('')
            }
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    // проблемы здесь в этом файле, он слишком долго меняет переменные mainIdea,creatorName,creatorProfile из-за чего я не могу своевременно поставить их на сайт или использовать

    return (
        <>
            <DefaultTemplate>
                <div id='idea_page'>
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
                    <h1 className='idea_page_title'>
                        <div className='idea_creator'>
                            {!!creatorName && (
                                <>
                                    <img src={creatorProfile ? creatorProfile : creatorImageNull} className='idea_creator_avatar' alt="" />
                                    <p>{creatorName}</p>
                                </>
                            )}
                        </div>
                        {mainIdea.name}
                    </h1>
                </div>
            </DefaultTemplate>
        </>
    );
}

export default IdeasPage;