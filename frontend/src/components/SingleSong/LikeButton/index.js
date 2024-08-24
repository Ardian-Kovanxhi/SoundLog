import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import OpenModalMenuItem from '../../Modals/OpenModalButton';
import LoginFormModal from '../../Modals/LoginFormModal';
import { createLike, getAllSongLikes, getAllUserLikes, getLikesByUser, removeLike } from '../../../store/likes';
import './LikeButton.scss'
import { usePage } from '../../../context/Page/Page';


export default function LikeButton({ songId, pageRendered }) {
    const dispatch = useDispatch();

    const User = useSelector(state => state.session.user);
    const likeState = useSelector(state => state.likes.loggedUserLikes);
    const totalLikes = useSelector(state => state.likes.likeCount);

    const { lightMode } = usePage();


    const [like, setLike] = useState(false);
    const [hovered, setHover] = useState(false)

    useEffect(() => {
        likeState.has(Number(songId)) ? setLike(true) : setLike(false);
    }, [likeState])

    const likeBtnClass = `likeBtn${pageRendered ? ' singlePage' : ' splashPage'}${lightMode ? '' : ' night'}`


    return (
        <>
            {User ?
                like ?
                    <div>

                        <button
                            className={likeBtnClass}
                            onClick={async () => {
                                await dispatch(removeLike(songId))
                                await dispatch(getLikesByUser(songId))
                                await dispatch(getAllSongLikes(songId))
                            }}
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                        >
                            <i className={`fa-solid ${hovered ? 'fa-heart-crack' : 'fa-heart'} fa-2xl`} />
                        </button>
                    </div>
                    :
                    <div>

                        <button
                            className={likeBtnClass}
                            onClick={async () => {
                                await dispatch(createLike(songId))
                                await dispatch(getLikesByUser(songId))
                                await dispatch(getAllSongLikes(songId))
                            }}
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                        >
                            <i className={`${hovered ? 'fa-solid' : 'fa-regular'} fa-heart fa-2xl`} />
                        </button>
                    </div>
                :
                <div
                    className={likeBtnClass + ' loginBtn'}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    <OpenModalMenuItem
                        buttonText={<i className={`${hovered ? 'fa-solid' : 'fa-regular'} fa-heart fa-2xl`} />}
                        modalComponent={<LoginFormModal />}
                    />
                </div>
            }
            <div
                style={pageRendered ? {} : { display: 'none' }}
                className={`likeCount${lightMode ? '' : ' night'}`}
            >
                {totalLikes}
            </div >
        </>
    )
}