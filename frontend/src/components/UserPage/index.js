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

export default function UserPage() {
    const dispatch = useDispatch();

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
                    <div>
                        USER PAGE {User.username}
                    </div>
                    <div>
                        -----------------------------------------------
                    </div>
                    <LikeList />
                    <div>
                        -----------------------------------------------
                    </div>
                    <SongList />
                </div>
                : <ErrorPage />}
        </>
    )
}