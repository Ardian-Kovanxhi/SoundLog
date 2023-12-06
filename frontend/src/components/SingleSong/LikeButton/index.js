import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import OpenModalMenuItem from '../../Modals/OpenModalButton';
import LoginFormModal from '../../Modals/LoginFormModal';
import { createLike, getAllSongLikes, getAllUserLikes, getLikesByUser, removeLike } from '../../../store/likes';
import './LikeButton.css'


export default function LikeButton() {
    const dispatch = useDispatch();
    const { songId } = useParams();

    const User = useSelector(state => state.session.user);
    const likeState = useSelector(state => state.likes.singleLike);
    const totalLikes = useSelector(state => state.likes.likeCount);
    const pageState = useSelector(state => state.global.lightState);


    const [like, setLike] = useState(false);
    const [hovered, setHover] = useState(false)



    async function fetchData() {
        await dispatch(getLikesByUser(songId));
        await dispatch(getAllSongLikes(songId))
        likeState.like ? setLike(true) : setLike(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchData();
    }, [User]);


    return (
        <>
            {User ?
                like ?
                    <button
                        className={`likeBtn${pageState ? '' : ' night'}`}
                        onClick={async () => {
                            await dispatch(removeLike(songId))
                            await dispatch(getLikesByUser(songId))
                            await dispatch(getAllSongLikes(songId))
                            likeState.like ? setLike(true) : setLike(false)
                        }}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                    >
                        <i className={`fa-solid ${hovered ? 'fa-heart-crack' : 'fa-heart'} fa-2xl`} />
                    </button>
                    :
                    <button
                        className={`likeBtn${pageState ? '' : ' night'}`}
                        onClick={async () => {
                            await dispatch(createLike(songId))
                            await dispatch(getLikesByUser(songId))
                            await dispatch(getAllSongLikes(songId))
                            likeState.like ? setLike(true) : setLike(false)
                        }}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                    >
                        <i className={`${hovered ? 'fa-solid' : 'fa-regular'} fa-heart fa-2xl`} />
                    </button>
                :
                <button
                    className={`likeBtn${pageState ? '' : ' night'}`}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    <OpenModalMenuItem
                        buttonText={<i className={`${hovered ? 'fa-solid' : 'fa-regular'} fa-heart fa-2xl`} />}
                        modalComponent={<LoginFormModal />}
                    />
                </button>
            }
            <div className={`likeCount${pageState ? '' : ' night'}`}>
                {totalLikes}
            </div>
        </>
    )
}