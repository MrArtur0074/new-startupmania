import liked from "@/assets/icons/liked.svg";
import like_img from "@/assets/icons/like.svg";
import supported from "@/assets/icons/supported.svg";
import support_img from "@/assets/icons/support.svg";
import view from "@/assets/icons/view.svg"
import viewPressed from "@/assets/icons/view-pressed.svg"
import { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { handleDislikeIdeaFunc, handleLikeIdeaFunc, handleStopSupportIdeaFunc, handleSupportIdeaFunc } from "../../app/api";
function Idea(props) {
    const [like, setLike] = useState(null)
    const [support, setSupport] = useState(null)
    const [viewing, setViewing] = useState(null)
    const [process, setProcess] = useState(false)
    const access_token = localStorage.getItem('access_token');
    const [likeCount, setLikeCount] = useState(null)
    const [supportCount, setSupportCount] = useState(null)

    useEffect(() => {
        setLike(props?.idea?.user_liked)
        setSupport(props?.idea?.is_supported)
        setLikeCount(props?.idea.likes)
        setSupportCount(props?.idea.supporters_count)
        AOS.init({
            duration: 1000,
            mirror: true,
            once: true
        });
    }, [])
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
    const handleView = async () => {
        setViewing(true)
        setTimeout(() => {
            setViewing(false)
        }, 1000);
    }
    const handleLikeIdea = async () => {
        try {
            const response = await handleLikeIdeaFunc(access_token, props?.idea?.id);
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
            const response = await handleDislikeIdeaFunc(access_token, props?.idea?.id);
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
            const response = await handleSupportIdeaFunc(access_token, props?.idea?.id);
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
            const response = await handleStopSupportIdeaFunc(access_token, props?.idea?.id);
            setSupportCount(response?.data?.supporters_count);
            setProcess(false);
            setSupport(false);
        } catch (error) {
            console.error('Не получилось сделать запрос', error);
            setProcess(false)
        }
    };
    return (
        <div className='idea_block ideas_block' key={props.idea?.id} data-aos="fade-up-right">
            <div className='idea'>
                <h3 className='idea_name'>{props?.idea?.name}</h3>
                <p className='idea_description'>{props?.idea?.description}</p>
                <p className='idea_tag_prop'>{props?.idea?.tag}</p>
            </div>
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
                <a className='idea_view' href={`/idea/${props?.idea?.id}`} onClick={handleView}><img className='idea_button_img' src={viewing ? viewPressed : view} alt="<->" /></a>
            </div>
        </div>
    );
}
export default Idea