import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getLoad } from "../../../store/global";
import { getSong, getUserSongs, playSong } from "../../../store/songs";
import { getCommentsBySong } from "../../../store/comments";
import { getAllSongLikes, getAllUserLikes } from "../../../store/likes";
import { useState } from "react";
import { getPaused, getRawTime, getTime } from "../../../store/audioPlayerState";
import { getUser } from "../../../store/session";
import ProgressBar from "../ProgressBar";
import './Lists.css'

export default function LikeList({ focused }) {
    const history = useHistory();
    const dispatch = useDispatch();

    const currSong = useSelector(state => state.songs.playingSong);
    const paused = useSelector(state => state.audioState.pauseState);
    const pageState = useSelector(state => state.global.lightState);
    const likes = useSelector(state => state.likes.viewedUserLikes);
    const likeArr = Object.values(likes);

    const singleLoader = async singleId => {
        await dispatch(getSong(singleId));
        await dispatch(getCommentsBySong(singleId));
        await dispatch(getAllSongLikes(singleId));
        history.push(`/songs/${singleId}`);
    };

    const userLoader = async userId => {
        await dispatch(getUser(userId));
        await dispatch(getAllUserLikes(userId));
        await dispatch(getUserSongs(userId));
        history.push(`/users/${Number(userId) - 1}`);
    }

    return (
        <div
            className={`like-list${focused === 2 ? ' unfocused' : ''}`}
        >
            {likeArr.length > 0 ? likeArr.map((like, index) => {


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
                        className="user-list-items"
                        key={index}
                    // 
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
                                                onClick={() => dispatch(playSong(like.Song.id))}
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
                                                dispatch(getLoad(true))
                                                userLoader(like.Song.User.id);
                                            }}
                                        >
                                            {like.Song.User.username}
                                        </div>
                                        <div
                                            className={`user-list-song-name${pageState ? '' : ' night'}`}
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
            }) :
                <div style={pageState ? { color: "black" } : { color: "white" }}>
                    No Likes
                </div>
            }
        </div >
    )
}