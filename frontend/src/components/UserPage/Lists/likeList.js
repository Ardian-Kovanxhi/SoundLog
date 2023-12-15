import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getLoad } from "../../../store/global";
import { getSong, playSong } from "../../../store/songs";
import { getCommentsBySong } from "../../../store/comments";
import { getAllSongLikes } from "../../../store/likes";
import { useState } from "react";
import { getPaused, getRawTime, getTime } from "../../../store/audioPlayerState";
import ProgressBar from "../ProgressBar";
import './Lists.css'

export default function LikeList({ focused }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const currSong = useSelector(state => state.songs.playingSong);
    const paused = useSelector(state => state.audioState.pauseState);
    // const likes = useSelector(state => state.likes.userLikes);
    const likes = useSelector(state => state.likes.viewedUserLikes);
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
                {likeArr.length > 0 ? likeArr.map((like, index) => {

                    const liClass = `user-list-items${hoveredIndex === index ? ' hovered' : ''}`

                    const handleSeek = (seekTime) => {
                        if (currSong.id !== like.Song.id) {
                            dispatch(playSong(like.Song.id))
                            dispatch(getTime(0))
                            return
                        }
                        const newSeekTime = (seekTime / 100) * like.Song.duration;
                        dispatch(getRawTime(newSeekTime))
                    };

                    return (
                        <div
                            className={liClass}
                            key={index}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >

                            <div
                                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}
                            >
                                <img
                                    className='user-list-song-img'
                                    src={like.Song.img}
                                    onClick={() => {
                                        dispatch(getLoad(true));
                                        singleLoader(like.Song.id);
                                    }}
                                />

                                <div style={{ display: 'flex', flexDirection: 'column', height: '130px', justifyContent: 'space-between' }}>
                                    <div
                                        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}
                                    >
                                        {
                                            like.Song.id === currSong.id ?
                                                paused ?
                                                    <button
                                                        className="user-univ-button"
                                                        onClick={() => { dispatch(getPaused(false)) }}
                                                    >

                                                        <i className="fa-solid fa-play" />

                                                    </button> :

                                                    <button
                                                        className="user-univ-button"
                                                        onClick={() => { dispatch(getPaused(true)) }}
                                                    >

                                                        <i className="fa-solid fa-pause user-pause" />

                                                    </button> :

                                                <button
                                                    className="user-univ-button"
                                                    onClick={() => dispatch(playSong(like.Song.id))}
                                                >

                                                    <i className="fa-solid fa-play" />

                                                </button>
                                        }
                                        <div
                                            className="user-list-song-username-div"
                                        >
                                            <div
                                                onClick={() => {
                                                    dispatch(getLoad(true))
                                                    history.push(`/users/${Number(like.Song.User.id) - 1}`)
                                                }}
                                            >
                                                {like.Song.User.username}
                                            </div>
                                            <div
                                                onClick={() => {
                                                    dispatch(getLoad(true));
                                                    singleLoader(like.Song.id);
                                                }}
                                            >
                                                {like.Song.name}
                                            </div>
                                        </div>
                                    </div>

                                    <ProgressBar onSeek={handleSeek} listSong={like.Song} />
                                </div>
                            </div>
                        </div>
                    )
                }) : 'No Likes'}
            </div>
        </div>
    )
}