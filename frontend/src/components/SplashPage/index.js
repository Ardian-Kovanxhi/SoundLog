import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import placeholderImg from '../../images/placeholder.png'
import LikeButton from '../SingleSong/LikeButton';
import GenClass from '../StoreFunctionClasses/GenClass';
import PlayPauseBtn from '../Global/AudioUtils/play-pause-btn';
import { usePage } from '../../context/Page';
import { getPlaylists } from '../../store/playlists';
import { clearSongStore, getSongs } from '../../store/songs';
import './Songs.scss'

export default function SplashPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const Songs = useSelector(state => state.songs.allSongs);
    const Playlists = useSelector(state => state.playlists.allPlaylists);
    const { lightMode, setLoadState, splashDisplay } = usePage();
    const [hoveredIndex, setHoveredIndex] = useState(null);


    const fetchSongData = useCallback(async () => {
        await setLoadState(true)
        await dispatch(getSongs())
        await dispatch(clearSongStore())
        await setLoadState(false)
    }, [dispatch, setLoadState])


    const fetchPlaylistData = useCallback(async () => {
        await setLoadState(true)
        await dispatch(getPlaylists());
        await setLoadState(false)
    }, [dispatch, setLoadState])


    useEffect(() => {
        if (splashDisplay) {
            fetchSongData()
        } else {
            fetchPlaylistData();
        }
    }, [dispatch, fetchPlaylistData, fetchSongData, splashDisplay])

    return (
        <>
            <div className='all-songs-div-container'>
                {Object.values(splashDisplay ? Songs : Playlists).map((el, index) => {

                    const btnClass = `univ-play-pause-button${hoveredIndex === index ? ' hovered' : ''} ${lightMode ? '' : ' night'}`

                    return (
                        <div
                            className={`all-songs-single ${lightMode ? '' : ' night'}`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            key={index}
                        >
                            {splashDisplay ?
                                <div className={`like-btn-render${hoveredIndex === index ? ' hovered' : ''}`}>
                                    <LikeButton songId={el.id} pageRendered={false} />
                                </div>
                                :
                                null
                            }

                            <div
                                style={{
                                    width: '200px',
                                    height: '237px',
                                    padding: '17px'

                                }}
                                onClick={async () => {
                                    setLoadState(true);
                                    if (splashDisplay) history.push(`/songs/${el.id}`);
                                    else history.push(`/playlists/${el.id}`);
                                }}
                            >
                                <div className='all-songs-img-div'>

                                    <img
                                        className='all-songs-single-img'
                                        // src={splashDisplay ? el.img : el.coverImg || placeholderImg}
                                        src={el.coverImg || placeholderImg}
                                        alt='Album Cover'
                                    />
                                    <div className={`gradient-div${hoveredIndex === index ? ' hovered' : ''}`}></div>

                                </div>

                                <div className={`all-songs-song-name ${lightMode ? '' : ' night'}`}>
                                    {el.name}
                                </div>

                            </div>

                            <div
                                className={`all-songs-username ${lightMode ? '' : ' night'}`}
                                onClick={() => {
                                    GenClass.userRedirect(el.User.id, history);
                                }}
                            >
                                {el.User.username}
                            </div>

                            {
                                splashDisplay ?
                                    <PlayPauseBtn songId={el.id} classTag={btnClass} big={true} />
                                    :
                                    null
                            }

                        </div>
                    )
                })}
            </div>
        </>
    )
}