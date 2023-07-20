import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
// import { getCommentsBySong } from "../../store/comments";
import { getSongs, getSong, playSong } from '../../store/songs';
// import { AudioContext } from '../../context/AudioContext';
// import { PlayerContext } from '../AudioControls';
import AudioControls from '../AudioControls';

export default function SelectedSong() {
    const dispatch = useDispatch();
    // const player = useContext(PlayerContext)
    const Songs = useSelector(state => state.songs.allSongs);
    const song = useSelector(state => state.songs.playingSong)
    // const Song = useSelector(state => state.songs.singleSong);
    const history = useHistory()
    // const User = useSelector(state => state.session.user)
    const [playing, setPlaying] = useState(false)
    const { playAudio, pauseAudio } = AudioControls

    const handlePauseClick = () => {
        // console.log(player)
        pauseAudio()
        setPlaying(false)
    };

    const handlePlayClick = () => {
        playAudio()
        setPlaying(true)
    };


    useEffect(() => {
        dispatch(getSongs())
    }, [])

    const songArr = Object.values(Songs)

    return (
        <div className='all-songs-div-container'>
            <div className='all-songs-div'>
                {songArr.map(el => (
                    <>
                        <div
                            className='all-songs-single'
                            onClick={() => history.push(`/songs/${el.id}`)}
                        >
                            <img
                                className='all-songs-single-img'
                                src={el.img ||
                                    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'} />
                            <div className='all-songs-song-name'>
                                {el.name}
                            </div>
                            <div className='all-songs-username'>
                                {el.User.username}
                            </div>
                        </div>
                        {song.id === el.id ?

                            playing ?
                                // isPlaying ?

                                // <button onClick={() => setPlaying(false)}>
                                <button onClick={handlePauseClick}>

                                    {/* pause */}
                                    <i className="fa-solid fa-pause" />

                                </button> :

                                // <button onClick={() => setPlaying(true)}>
                                <button onClick={handlePlayClick}>

                                    <i className="fa-solid fa-play" />

                                </button> :

                            <button onClick={() => dispatch(playSong(el.id)).then(setPlaying(true))}>

                                <i className="fa-solid fa-play" />

                            </button>
                        }
                        {/* <button onClick={() => dispatch(playSong(el.id))}>play</button> */}
                    </>
                ))}
            </div>
        </div>
    )
}
