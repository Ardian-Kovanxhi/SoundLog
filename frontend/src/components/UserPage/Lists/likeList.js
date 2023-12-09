import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getLoad } from "../../../store/global";
import { getSong, playSong } from "../../../store/songs";
import { getCommentsBySong } from "../../../store/comments";
import { getAllSongLikes } from "../../../store/likes";
import { useState } from "react";
import './Lists.css'
import { useEffect } from "react";
import { getPaused } from "../../../store/audioPlayerState";

export default function LikeList({ focused }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const song = useSelector(state => state.songs.playingSong);
    const paused = useSelector(state => state.audioState.pauseState);
    const likes = useSelector(state => state.likes.userLikes);
    const likeArr = Object.values(likes);

    const singleLoader = async singleId => {
        await dispatch(getSong(singleId));
        await dispatch(getCommentsBySong(singleId));
        await dispatch(getAllSongLikes(singleId));
        history.push(`/songs/${singleId}`);
    };

    return (
        <div
            className={`like-list${focused === 1 ? ' unfocused' : ''}`}
        >
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
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {
                                // hoveredIndex === index ?
                                song.id === like.Song.id ?
                                    paused ?
                                        <button
                                            // className={btnClass}
                                            onClick={() => { dispatch(getPaused(false)) }}
                                        >

                                            <i className="fa-solid fa-play" />

                                        </button> :

                                        <button
                                            // className={`pause ${btnClass}`}
                                            onClick={() => { dispatch(getPaused(true)) }}
                                        >

                                            <i className="fa-solid fa-pause" />

                                        </button> :

                                    <button
                                        // className={btnClass}
                                        onClick={() => dispatch(playSong(like.Song.id))}
                                    >

                                        <i className="fa-solid fa-play" />

                                    </button>
                            }
                            <div
                                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}
                                onClick={() => {
                                    dispatch(getLoad(true));
                                    singleLoader(like.Song.id);
                                }}
                            >
                                <div>
                                    {index + 1}:
                                </div>
                                <img style={{ width: '60px', height: '60px' }} src={like.Song.img} />
                                <div>
                                    {like.Song.name}
                                </div>
                            </div>
                        </div>
                    )
                }) : 'No Likes'}
            </div>
        </div>
    )
}