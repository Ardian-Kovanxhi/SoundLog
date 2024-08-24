import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getCommentsBySong } from "../../store/comments";
import { getSong, playSong } from '../../store/songs';
import { getPaused, getTime, getRawTime } from '../../store/audioPlayerState';
import { getLoad } from '../../store/global';
import { getAllSongLikes, getLikesByUser } from '../../store/likes';
import ErrorPage from '../ErrorPage';
import BtnMenu from './DropdownMenus/edit-deleteMenu';
import SongComments from './SongComments'
import ProgressBar from './ProgressBar';
import LikeButton from './LikeButton';
import placeholderImg from '../../images/song-placeholder.png'
import './SingleSong.scss'
import GenClass from '../StoreFunctionClasses/GenClass';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { usePage } from '../../context/Page/Page';



export default function SingleSong() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { songId } = useParams();


    const Song = useSelector(state => state.songs.singleSong);
    const currSong = useSelector(state => state.songs.playingSong);
    const User = useSelector(state => state.session.user);
    const paused = useSelector(state => state.audioState.pauseState);
    let Uploader = '';

    const { lightMode } = usePage();

    async function fetchData() {
        await dispatch(getLoad(true));
        await dispatch(getSong(songId));
        await dispatch(getCommentsBySong(songId));
        await dispatch(getAllSongLikes(songId));
        await dispatch(getLoad(false));
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSeek = (seekTime) => {
        if (currSong.id !== Song.id) {
            dispatch(playSong(Song.id))
            dispatch(getTime(0))
            return
        }
        const newSeekTime = (seekTime / 100) * Song.duration;
        dispatch(getRawTime(newSeekTime))
    };

    if (Song.User) {
        Uploader = Song.User.username
    }

    return (
        <>
            {Song.id ?

                <div className='single-song-container-div'>

                    <div className='single-song-div'>
                        <div
                            className='blur-box'
                        >

                            <div className={`filler-color-2${lightMode ? '' : ' night'}`}></div>

                            <img
                                className='blur-img'
                                src={Song.img || placeholderImg}
                                alt='Blurred Background'
                            />

                        </div>

                        <div className='single-song-info-img-div'>

                            <div className='single-song-info-div'>

                                <div className='info-buttons-div'>

                                    <div>
                                        <div className='pfp-info-div'>
                                            {currSong.id === Song.id ?

                                                paused ?

                                                    <button
                                                        className={`single-univ-button${lightMode ? '' : ' night'}`}
                                                        onClick={() => { dispatch(getPaused(false)) }}
                                                    >

                                                        <i className="fa-solid fa-play fa-2xl" />

                                                    </button> :

                                                    <button
                                                        className={`single-univ-button${lightMode ? '' : ' night'}`}
                                                        onClick={() => { dispatch(getPaused(true)) }}
                                                    >

                                                        <i className="fa-solid fa-pause fa-2xl single-pause" />

                                                    </button> :

                                                <button
                                                    className={`single-univ-button${lightMode ? '' : ' night'}`}
                                                    onClick={() => dispatch(playSong(Song.id))}
                                                >

                                                    <i className="fa-solid fa-play fa-2xl" />

                                                </button>
                                            }

                                            <div className='song-name-uploader-div'>

                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                    }}
                                                >
                                                    <div className={`song-name-div${lightMode ? '' : ' night'}`}>
                                                        {Song.name}
                                                    </div>

                                                    <LikeButton songId={songId} pageRendered={true} />

                                                    {
                                                        User ?
                                                            Song.userId === User.id || User.id === 1
                                                                ?
                                                                <div className='edit-delete-buttons-div'>
                                                                    <BtnMenu />
                                                                </div>
                                                                :
                                                                null : null
                                                    }

                                                </div>

                                                <div
                                                    className={`song-uploader-div${lightMode ? '' : ' night'}`}
                                                    onClick={() => GenClass.userRedirect(Number(Song.User.id), history)}
                                                >
                                                    {Uploader}
                                                </div>

                                            </div>
                                        </div>
                                    </div>


                                </div>

                                <div
                                    className={`single-song-desc ${!!Song.description ? '' : 'false'} ${lightMode ? '' : 'night'}`}
                                >
                                    {Song.description}
                                </div>

                                <ProgressBar onSeek={handleSeek} />

                                {
                                    User ?
                                        User.id === 1 ?
                                            <div>{Song.content}</div> :
                                            null : null

                                }

                            </div>


                            <div
                                style={{
                                    zIndex: '2',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >

                                <img
                                    className='single-song-img'
                                    src={
                                        Song.img
                                        ||
                                        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'
                                    }
                                    alt='Album Cover' />

                            </div>


                        </div>

                    </div>

                    <SongComments />

                </div>
                :
                <ErrorPage />
            }

        </>

    )
}