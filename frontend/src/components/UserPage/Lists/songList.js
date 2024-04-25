import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import { getLoad } from "../../../store/global";
import { getSong, getUserSongs, playSong } from "../../../store/songs";
import { getCommentsBySong } from "../../../store/comments";
import { getAllSongLikes, getAllUserLikes } from "../../../store/likes";
import { getPaused, getRawTime, getTime } from "../../../store/audioPlayerState";
import ProgressBar from "../ProgressBar";
import { getUser } from "../../../store/session";
import './Lists.scss'
import GenClass from "../../StoreFunctionClasses/GenClass";

export default function SongList({ focused }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [hoveredIndex, setHoveredIndex] = useState(null)

    const currSong = useSelector(state => state.songs.playingSong);
    const paused = useSelector(state => state.audioState.pauseState);
    const pageState = useSelector(state => state.global.lightState);
    const Songs = useSelector(state => state.songs.userSongs);
    const songArr = Object.values(Songs);

    const singleLoader = async singleId => {
        await dispatch(getSong(singleId));
        await dispatch(getCommentsBySong(singleId));
        await dispatch(getAllSongLikes(singleId));
        history.push(`/songs/${singleId}`)
    }

    const userLoader = async userId => {
        await dispatch(getUser(userId));
        await dispatch(getAllUserLikes(userId));
        await dispatch(getUserSongs(userId));
        history.push(`/users/${Number(userId) - 1}`);
    }

    return (
        <div
            className={`song-list${focused === 1 ? ' unfocused' : ''}`}
        >

            {songArr.length > 0 ? songArr.map((song, index) => {

                const liClass = `user-list-items songs${hoveredIndex === index ? ' hovered' : ''}`;

                const handleSeek = (seekTime) => {
                    if (currSong.id !== song.id) {
                        dispatch(playSong(song.id));
                        dispatch(getTime(0));
                        return;
                    };
                    const newSeekTime = (seekTime / 100) * song.duration;
                    dispatch(getRawTime(newSeekTime));
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
                                src={song.img}
                                onClick={() => {
                                    dispatch(getLoad(true));
                                    singleLoader(song.id);
                                }}
                            />

                            <div style={{ display: 'flex', flexDirection: 'column', height: '130px', justifyContent: 'space-between' }}>

                                <div
                                    style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}
                                >
                                    {
                                        song.id === currSong.id ?
                                            paused ?
                                                <button
                                                    className={`user-univ-button${pageState ? '' : ' night'}`}

                                                    onClick={() => { dispatch(getPaused(false)) }}
                                                >

                                                    <i className="fa-solid fa-play" />

                                                </button> :

                                                <button
                                                    className={`user-univ-button${pageState ? '' : ' night'}`}

                                                    onClick={() => { dispatch(getPaused(true)) }}
                                                >

                                                    <i className="fa-solid fa-pause user-pause" />

                                                </button> :

                                            <button
                                                className={`user-univ-button${pageState ? '' : ' night'}`}

                                                onClick={() => dispatch(playSong(song.id))}
                                            >

                                                <i className="fa-solid fa-play" />

                                            </button>
                                    }
                                    <div
                                        className="user-list-song-username-div"
                                    >
                                        <div
                                            className={`user-list-username${pageState ? '' : ' night'}`}

                                            onClick={() => {
                                                // userLoader(song.User.id);
                                                GenClass.userRedirect(Number(song.User.id), history)
                                            }}
                                        >
                                            {song.User.username}
                                        </div>
                                        <div
                                            className={`user-list-song-name${pageState ? '' : ' night'}`}
                                            onClick={() => {
                                                dispatch(getLoad(true));
                                                singleLoader(song.id);
                                            }}
                                        >
                                            {song.name}
                                        </div>
                                    </div>
                                </div>

                                <ProgressBar onSeek={handleSeek} listSong={song} />
                            </div>
                        </div>
                    </div>
                )
            }) :
                <div style={pageState ? { color: "black" } : { color: "white" }}>
                    No Songs
                </div>
            }
        </div >
    )
}