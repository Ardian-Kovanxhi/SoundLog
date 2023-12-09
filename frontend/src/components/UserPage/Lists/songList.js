import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getLoad } from "../../../store/global";
import { getSong } from "../../../store/songs";
import { getCommentsBySong } from "../../../store/comments";
import { getAllSongLikes } from "../../../store/likes";
import { useState } from "react";
import './Lists.css'

export default function SongList({ focused }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [hoveredIndex, setHoveredIndex] = useState(null)

    const song = useSelector(state => state.songs.playingSong);
    const paused = useSelector(state => state.audioState.pauseState);
    const Songs = useSelector(state => state.songs.userSongs);
    const songArr = Object.values(Songs);

    const singleLoader = async singleId => {
        await dispatch(getSong(singleId));
        await dispatch(getCommentsBySong(singleId));
        await dispatch(getAllSongLikes(singleId));
        history.push(`/songs/${singleId}`)
    }

    return (
        <div
            className={`song-list${focused === 2 ? ' unfocused' : ''}`}
        >
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
                        <div>
                            {index + 1}:
                        </div>
                        <img style={{ width: '60px', height: '60px' }} src={song.img} />
                        <div>
                            {song.name}
                        </div>
                    </div>
                )
            }) : 'No Songs'}
        </div>
    )
}