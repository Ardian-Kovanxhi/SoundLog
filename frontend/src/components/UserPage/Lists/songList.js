import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import { getSong, getUserSongs, playSong } from "../../../store/songs";
import { getCommentsBySong } from "../../../store/comments";
import { getAllSongLikes, getAllUserLikes } from "../../../store/likes";
import ProgressBar from "../ProgressBar";
import { getUser } from "../../../store/session";
import './Lists.scss'
import GenClass from "../../StoreFunctionClasses/GenClass";
import { usePage } from "../../../context/Page";
import { useAudio } from "../../../context/Audio";
import PlayPauseBtn from "../../Global/AudioUtils/play-pause-btn";

export default function SongList({ focused }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [hoveredIndex, setHoveredIndex] = useState(null)

    const currSong = useSelector(state => state.songs.playingSong);
    const Songs = useSelector(state => state.songs.userSongs);
    const songArr = Object.values(Songs);

    const { lightMode, setLoadState } = usePage();
    const { setSeekTime, playTimeHandler } = useAudio();

    const singleLoader = async singleId => {
        await dispatch(getSong(singleId));
        await dispatch(getCommentsBySong(singleId));
        await dispatch(getAllSongLikes(singleId));
        history.push(`/songs/${singleId}`)
    }

    // eslint-disable-next-line no-unused-vars
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
                        playTimeHandler(0)
                        return;
                    };
                    const newSeekTime = (seekTime / 100) * song.duration;
                    setSeekTime(newSeekTime);
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
                                src={song.coverImg}
                                onClick={() => {
                                    setLoadState(true)
                                    singleLoader(song.id);
                                }}
                                alt=""
                            />

                            <div style={{ display: 'flex', flexDirection: 'column', height: '130px', justifyContent: 'space-between' }}>

                                <div
                                    style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}
                                >
                                    <PlayPauseBtn songId={song.id} classTag={"user-univ-button"} big={false} />
                                    <div
                                        className="user-list-song-username-div"
                                    >
                                        <div
                                            className={`user-list-username${lightMode ? '' : ' night'}`}

                                            onClick={() => {
                                                // userLoader(song.User.id);
                                                GenClass.userRedirect(Number(song.User.id), history)
                                            }}
                                        >
                                            {song.User.username}
                                        </div>
                                        <div
                                            className={`user-list-song-name${lightMode ? '' : ' night'}`}
                                            onClick={() => {
                                                setLoadState(true);
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
                <div style={lightMode ? { color: "black" } : { color: "white" }}>
                    No Songs
                </div>
            }
        </div >
    )
}