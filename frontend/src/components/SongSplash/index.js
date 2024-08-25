import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getSongs, playSong, setCurrPage } from '../../store/songs';
import placeholderImg from '../../images/song-placeholder.png'
import LikeButton from '../SingleSong/LikeButton';
import GenClass from '../StoreFunctionClasses/GenClass';
import { usePage } from '../../context/Page';
import { useAudio } from '../../context/Audio';
import './Songs.scss'



export default function AllSongs() {
    const dispatch = useDispatch();
    const history = useHistory();

    const Songs = useSelector(state => state.songs.allSongs);
    const pageCounter = useSelector(state => state.songs.allSongsPage);
    const song = useSelector(state => state.songs.playingSong);
    const songPageInfo = useSelector(state => state.songs.allSongsPage);

    const { lightMode, setLoadState } = usePage();
    const { pauseState, setPauseState } = useAudio();

    const [hoveredIndex, setHoveredIndex] = useState(null);

    const pageButtons = [];

    useEffect(() => {
        GenClass.fetchData(dispatch, songPageInfo.currPage, setLoadState)
    }, [dispatch, setLoadState, songPageInfo.currPage])

    for (let i = 1; i < pageCounter.totalPages + 1; i++) {
        pageButtons.push(
            <button
                style={songPageInfo.currPage === i ? { textDecoration: 'underline', fontWeight: 'bold' } : {}}
                key={i}
                onClick={() => {
                    dispatch(getSongs(i));
                    dispatch(setCurrPage(i));
                }}
            >
                {i}
            </button>
        )
    }

    return (
        <>
            <div className='all-songs-div-container'>
                {Object.values(Songs).map((el, index) => {

                    const btnClass = `univ-play-pause-button${hoveredIndex === index ? ' hovered' : ''} ${lightMode ? '' : ' night'}`
                    // const btnClass = `univ-play-pause-button hovered ${lightMode ? '' : ' night'}` //used for testing


                    return (
                        <div
                            className={`all-songs-single ${lightMode ? '' : ' night'}`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            key={index}
                        >
                            <div className={`like-btn-render${hoveredIndex === index ? ' hovered' : ''}`}>
                                <LikeButton songId={el.id} pageRendered={false} />
                            </div>

                            <div
                                style={{
                                    width: '200px',
                                    height: '237px',
                                    padding: '17px'

                                }}
                                onClick={async () => {
                                    setLoadState(true);
                                    history.push(`/songs/${el.id}`);
                                    GenClass.singleRedirect(el.id, dispatch, history, setLoadState);
                                }}
                            >
                                <div className='all-songs-img-div'>

                                    <img
                                        className='all-songs-single-img'
                                        src={el.img || placeholderImg}
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
                                song.id === el.id ?
                                    pauseState ?
                                        <button
                                            className={btnClass}
                                            onClick={() => { setPauseState(false) }}
                                        >

                                            <i className="fa-solid fa-play fa-2xl" />

                                        </button> :

                                        <button
                                            className={`pause ${btnClass}`}
                                            onClick={() => { setPauseState(true) }}
                                        >

                                            <i className="fa-solid fa-pause fa-2xl splash-pause" />

                                        </button> :

                                    <button
                                        className={btnClass}
                                        onClick={() => dispatch(playSong(el.id))}
                                    >

                                        <i className="fa-solid fa-play fa-2xl" />

                                    </button>
                            }
                        </div>
                    )
                })}
                <div
                    className={`page-btns${lightMode ? '' : ' night'}`}
                >
                    Page: {pageButtons}
                </div>
            </div>
        </>
    )
}
