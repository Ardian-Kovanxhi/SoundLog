import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import placeholderImg from '../../images/song-placeholder.png'
import LikeButton from '../SingleSong/LikeButton';
import GenClass from '../StoreFunctionClasses/GenClass';
import PlayPauseBtn from '../Global/AudioUtils/play-pause-btn';
import { usePage } from '../../context/Page';
import './Songs.scss'



export default function AllSongs() {
    const dispatch = useDispatch();
    const history = useHistory();

    const Songs = useSelector(state => state.songs.allSongs);

    const { lightMode, setLoadState } = usePage();

    const [hoveredIndex, setHoveredIndex] = useState(null);

    useEffect(() => {
        GenClass.fetchData(dispatch, setLoadState)
    }, [dispatch, setLoadState])

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

                            <PlayPauseBtn songId={el.id} classTag={btnClass} big={true} />

                        </div>
                    )
                })}
            </div>
        </>
    )
}
