import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getLoad } from "../../../store/global";
import { getSong } from "../../../store/songs";
import { getCommentsBySong } from "../../../store/comments";
import { getAllSongLikes } from "../../../store/likes";
import { useState } from "react";
import './Lists.css'

export default function LikeList() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [hoveredIndex, setHoveredIndex] = useState(null)


    const likes = useSelector(state => state.likes.userLikes);
    const likeArr = Object.values(likes);

    const singleLoader = async singleId => {
        await dispatch(getSong(singleId));
        await dispatch(getCommentsBySong(singleId));
        await dispatch(getAllSongLikes(singleId));
        history.push(`/songs/${singleId}`)
    }

    return (
        <>
            <div>
                Likes
            </div>
            <div>
                {likeArr.length > 0 ? likeArr.map((like, index) => {

                    const liClass = `user-list-items${hoveredIndex === index ? ' hovered' : ''}`

                    return (
                        <div
                            className={liClass}
                            key={index}
                            onClick={() => {
                                dispatch(getLoad(true));
                                singleLoader(like.Song.id);
                            }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {index + 1}:{like.Song.name}
                        </div>
                    )
                }) : 'No Likes'}
            </div>
        </>
    )
}