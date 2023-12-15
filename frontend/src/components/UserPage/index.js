import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoad } from "../../store/global";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getUser } from "../../store/session";
import { getAllUserLikes } from "../../store/likes";
import { getUserSongs } from "../../store/songs";
import ErrorPage from "../ErrorPage";
import './UserPage.css'
import LikeList from "./Lists/likeList";
import SongList from "./Lists/songList";
import { useState } from "react";

export default function UserPage() {
    const dispatch = useDispatch();

    const [focused, setFocused] = useState(2);

    const { userId } = useParams();

    const User = useSelector(state => state.session.viewedUser);


    async function fetchData() {
        if (Number(userId) === 0) return
        await dispatch(getUser(Number(userId) + 1));
        await dispatch(getAllUserLikes(Number(userId) + 1))
        await dispatch(getUserSongs(Number(userId) + 1))
    }

    useEffect(() => {
        fetchData()
        dispatch(getLoad(false))
    }, [userId])

    return (
        <>
            {User ?
                <div className="user-container">
                    <div className="profile-background-container">
                        <img
                            className="profile-background"
                            src={User.backgroundPicture}
                        />
                    </div>

                    <div className="pfp-username-div">
                        <div className="profile-picture-container">
                            <img
                                src={User.profilePicture}
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
                                className={`like-toggle toggle-btns ${focused === 2 ? ' focused' : ''}`}
                                onClick={() => setFocused(2)}
                            >
                                Likes
                            </button>

                            <button
                                className={`song-toggle toggle-btns ${focused === 1 ? ' focused' : ''}`}
                                onClick={() => setFocused(1)}
                            >
                                Songs
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