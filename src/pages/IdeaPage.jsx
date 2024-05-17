import { useContext, useEffect, useState } from 'react';
import liked from "@/assets/icons/liked.svg";
import like_img from "@/assets/icons/like.svg";
import supported from "@/assets/icons/supported.svg";
import support_img from "@/assets/icons/support.svg";
import DefaultTemplate from "@/components/DefaultTemplate.jsx";
import { UserContext } from "@/App.jsx";
import './IdeaPage.scss'
import { Navigate, useParams } from 'react-router-dom';
import { getThisIdea, getThisUser, unAuthNav } from '../app/api';
import creatorImageNull from '../../src/assets/icons/user.svg'
import {handleDislikeIdeaFunc, handleLikeIdeaFunc, handleStopSupportIdeaFunc, handleSupportIdeaFunc } from '../app/api';

function IdeasPage() {
    const params = useParams()
    const [mainIdea, setMainIdea] = useState([])
    const [user, setUser] = useContext(UserContext);
    const [creator, setCreator] = useState([])
    const access_token = localStorage.getItem('access_token')
    const [likeCount, setLikeCount] = useState(null)
    const [supportCount, setSupportCount] = useState(null)
    const [like, setLike] = useState(null)
    const [support, setSupport] = useState(null)
    const [process, setProcess] = useState(false)

    useEffect(() => {
        setLike(mainIdea?.user_liked)
        setSupport(mainIdea?.is_supported)
        setLikeCount(mainIdea?.likes)
        setSupportCount(mainIdea?.supporters_count)
    }, [mainIdea])
    const handleLike = async () => {
        if (like === false && !process) {
            setProcess(true)
            handleLikeIdea()
        } else if (like && !process) {
            setProcess(true)
            handleDislikeIdea()
        }
    }
    const handleSupport = async () => {
        if (support === false && !process) {
            setProcess(true)
            handleSupportIdea()
        } else if (support && !process) {
            setProcess(true)
            handleStopSupportIdea()
        }
    }
    const handleLikeIdea = async () => {
        try {
            const response = await handleLikeIdeaFunc(access_token, mainIdea?.id);
            setLikeCount(response?.data?.likes);
            setProcess(false);
            setLike(true);
        } catch (error) {
            console.error('Не получилось сделать запрос', error);
            setProcess(false);
        }
    };
    const handleDislikeIdea = async () => {
        try {
            const response = await handleDislikeIdeaFunc(access_token, mainIdea?.id);
            setLikeCount(response?.data?.likes);
            setProcess(false);
            setLike(false);
        } catch (error) {
            console.error('Не получилось сделать запрос', error);
            setProcess(false)
        }
    };
    const handleSupportIdea = async () => {
        try {
            const response = await handleSupportIdeaFunc(access_token, mainIdea?.id);
            setSupportCount(response?.data?.supporters_count);
            setProcess(false);
            setSupport(true);
        } catch (error) {
            console.error('Не получилось сделать запрос', error);
            setProcess(false)
        }
    };
    const handleStopSupportIdea = async () => {
        try {
            const response = await handleStopSupportIdeaFunc(access_token, mainIdea?.id);
            setSupportCount(response?.data?.supporters_count);
            setProcess(false);
            setSupport(false);
        } catch (error) {
            console.error('Не получилось сделать запрос', error);
            setProcess(false)
        }
    };

    useEffect(() => {
        getThisIdea(access_token, params.id).then((response) => {
            setMainIdea(response.data)
            if (response?.data?.created_by) {
                getThisUser(access_token, response.data.created_by).then((res) => {
                    setCreator(res.data)
                }).catch((error) => {
                    console.log(error);
                });
            } else {
                unAuthNav()
            }
        }).catch((error) => {
            console.log(error)
        })
    }, [])


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
                    <div className='idea_page_title idea_page_box_transparent_blur_any_border'>
                        <div className='idea_creator'>
                            <img src={creator.avatar ? creator.avatar : creatorImageNull}
                                className='idea_creator_avatar' alt="" />
                            <p>{creator.username}</p>
                        </div>
                        {mainIdea.name}
                        <p onClick={() => console.log(mainIdea)}>m</p>
                        <div className='idea_buttons'>
                            <div className='idea_block_button' onClick={handleLike} style={{ color: 'rgb(221, 64, 63)' }}>
                                <img className='idea_button_img'
                                    src={like ? liked : like_img} alt="" />
                                {likeCount}
                            </div>
                            <div className='idea_block_button' onClick={handleSupport} style={{ color: 'rgb(147, 74, 247)' }}>
                                <img className='idea_button_img'
                                    src={support ? supported : support_img} alt="" />
                                {supportCount}
                            </div>
                        </div>
                    </div>
                    <div className='idea_desc_n_tags idea_page_box_transparent_blur_any_border'>
                        <h2>ОПИСАНИЕ</h2>
                        <p>{mainIdea.description}</p>
                        <p style={{color:'#934AF7'}}>{mainIdea.tag}</p>
                    </div>
                    <div className='idea_comments idea_page_box_transparent_blur_any_border'>
                        <h2>КОММЕНТАРИИ</h2>
                        {mainIdea?.comments?.map((comment,index)=>(
                            <div key={index} className='idea_comment'
                            onClick={()=>Navigate(`/profile/${comment.user}`)}>
                                {comment.text}
                            </div>
                        ))}
                    </div>
                </div>
            </DefaultTemplate>
        </>
    );
}

export default IdeasPage;