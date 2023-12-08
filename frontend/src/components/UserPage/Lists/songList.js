import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getLoad } from "../../../store/global";
import { getSong } from "../../../store/songs";
import { getCommentsBySong } from "../../../store/comments";
import { getAllSongLikes } from "../../../store/likes";
import { useState } from "react";
import './Lists.css'

export default function SongList() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [hoveredIndex, setHoveredIndex] = useState(null)

    const Songs = useSelector(state => state.songs.userSongs);
    const songArr = Object.values(Songs);

    const singleLoader = async singleId => {
        await dispatch(getSong(singleId));
        await dispatch(getCommentsBySong(singleId));
        await dispatch(getAllSongLikes(singleId));
        history.push(`/songs/${singleId}`)
    }

    return (
        <>
            <div>
                Songs
            </div>
            {songArr.length > 0 ? songArr.map((song, index) => {

                const liClass = `user-list-items songs${hoveredIndex === index ? ' hovered' : ''}`

                return (
                    <div
                        className={liClass}
                        key={index}
                        onClick={() => {
                            dispatch(getLoad(true));
                            singleLoader(song.id);
                        }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        {index + 1}:{song.name}
                    </div>
                )
            }) : 'No Songs'}
        </>
    )
}