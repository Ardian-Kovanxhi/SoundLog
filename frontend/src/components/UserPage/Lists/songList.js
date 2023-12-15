import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import { getLoad } from "../../../store/global";
import { getSong, playSong } from "../../../store/songs";
import { getCommentsBySong } from "../../../store/comments";
import { getAllSongLikes } from "../../../store/likes";
import { getPaused, getRawTime, getTime } from "../../../store/audioPlayerState";
import './Lists.css'
import ProgressBar from "../ProgressBar";
export default function SongList({ focused }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [hoveredIndex, setHoveredIndex] = useState(null)

    const currSong = useSelector(state => state.songs.playingSong);
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

                            {
                                song.id === currSong.id ?
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
                                        onClick={() => dispatch(playSong(song.id))}
                                    >

                                        <i className="fa-solid fa-play" />

                                    </button>
                            }

                            <div
                                className="user-list-song-username-div"
                                onClick={() => {
                                    dispatch(getLoad(true));
                                    singleLoader(song.id);
                                }}
                            >
                                <div>
                                    {song.User.username}
                                </div>
                                <div>
                                    {song.name}
                                </div>
                            </div>

                        </div>
                        <ProgressBar onSeek={handleSeek} listSong={song} />
                    </div>
                )
            }) : 'No Songs'}
        </div>
    )
}