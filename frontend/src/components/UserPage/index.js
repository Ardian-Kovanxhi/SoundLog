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

    const [focused, setFocused] = useState(2)

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
    }, [])

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


                    <div className="profile-picture-container">
                        <img
                            src={User.profilePicture}
                            className="profile-picture"
                        />
                    </div>

                    <div>
                        USER PAGE {User.username}
                    </div>
                    <LikeList focused={focused} />
                    <SongList focused={focused} />
                    <button
                        onClick={() => {
                            focused === 1 ? setFocused(2) : setFocused(1)
                        }}
                    >
                        Toggle Focus
                    </button>
                </div>
                : <ErrorPage />}
        </>
    )
}