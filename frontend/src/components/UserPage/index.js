import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoad } from "../../store/global";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getUser } from "../../store/session";
import { getAllUserLikes } from "../../store/likes";
import { getUserSongs } from "../../store/songs";
import ErrorPage from "../ErrorPage";
import LikeList from "./Lists/likeList";
import SongList from "./Lists/songList";
import tempImg from '../../images/song-placeholder.png'
import './UserPage.scss'

export default function UserPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [focused, setFocused] = useState(2);

    const { userId } = useParams();

    const User = useSelector(state => state.session.viewedUser);
    const pageState = useSelector(state => state.global.lightState);

    async function fetchData() {
        const unhashed = ((parseInt(userId, 16) / 7678831) - 79)
        if (Number(unhashed) === 1) {
            await dispatch(getLoad(false));
            history.push('/')
            return
        }
        await dispatch(getLoad(true));
        await dispatch(getUser(Number(unhashed)));
        await dispatch(getAllUserLikes(Number(unhashed)));
        await dispatch(getUserSongs(Number(unhashed)));
        await dispatch(getLoad(false));
    }

    useEffect(() => {
        setFocused(2)
        fetchData()
    }, [userId])

    return (
        <>
            {User ?
                <div className={`user-container`}>
                    <div className="profile-background-container">
                        <img
                            className="profile-background"
                            src={User.backgroundPicture}
                        />
                    </div>

                    <div className="pfp-username-div">
                        <div className="profile-picture-container">
                            <img
                                src={User.profilePicture || tempImg}
                                className="profile-picture"
                            />
                        </div>
                        <div style={{ fontSize: 'x-large', marginLeft: '20px', marginTop: '50px', padding: '10px', backgroundColor: 'black', color: 'white', height: 'fit-content' }}>
                            {User.username}
                        </div>
                    </div>

                    <div className="user-songs-likes-div">

                        <div className="toggle-btn-div">

                            <button
                                className={`song-toggle toggle-btns ${focused === 2 ? ' focused' : ''}${pageState ? '' : ' night'}`}
                                onClick={() => setFocused(2)}
                            >
                                Songs
                            </button>

                            <button
                                className={`like-toggle toggle-btns ${focused === 1 ? ' focused' : ''}${pageState ? '' : ' night'}`}
                                onClick={() => setFocused(1)}
                            >
                                Likes
                            </button>

                        </div>

                        <LikeList focused={focused} />
                        <SongList focused={focused} />

                    </div>
                </div>
                : <ErrorPage />}
        </>
    )
}