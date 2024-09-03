import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePage } from '../../../context/Page';
import { useAudio } from '../../../context/Audio';
import { playSong } from '../../../store/songs';
import './ProgressBar.scss'

// const ProgressBar = ({ onSeek, Song }) => {
const ProgressBar = ({ Song }) => {
    const dispatch = useDispatch();

    const [isSeeking, setIsSeeking] = useState(false);
    const progressBarRef = useRef(null);

    // const Song = useSelector(state => state.songs.singleSong);
    const currSong = useSelector(state => state.songs.playingSong);
    let time = ''

    const { lightMode } = usePage();
    const { setSeekTime, rawPlayTime, strPlayTime, playTimeHandler } = useAudio();

    if (Song.duration) {
        const mins = Math.floor(Song.duration / 60)
        const secs = Song.duration - (mins * 60)

        time = `${mins < 10 ? `0${mins}` : mins}:${secs < 10 ? `0${secs}` : secs}`
    }

    const onSeek = (seekTime) => {
        if (currSong.id !== Song.id) {
            dispatch(playSong(Song.id))
            playTimeHandler(0)
            return
        }
        const newSeekTime = (seekTime / 100) * Song.duration;
        setSeekTime(newSeekTime)
    };

    const handleMouseDown = (e) => {
        e.preventDefault();
        setIsSeeking(true);
        handleSeek(e);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseUp = (e) => {
        e.preventDefault();
        setIsSeeking(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e) => {
        e.preventDefault();
        if (isSeeking) {
            handleSeek(e);
        }
    };

    const handleSeek = (e) => {
        const progressBarWidth = progressBarRef.current.clientWidth;
        const clickPosition = e.clientX - progressBarRef.current.getBoundingClientRect().left;
        const seekTime = (clickPosition / progressBarWidth) * 100;
        onSeek(seekTime);
    };

    useEffect(() => {
        if (isSeeking) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isSeeking]);

    return (
        <div className={`progress-container ${lightMode ? '' : 'night'}`}>

            <div className='time-div'>

                <div>
                    {/* {currSong.id === Song.id ? songTime : '--:--'} */}
                    {currSong.id === Song.id ? strPlayTime : '--:--'}
                </div>

                <div>
                    {time}
                </div>

            </div>

            <div
                className={`progress-bar ${lightMode ? '' : 'night'}`}
                ref={progressBarRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                {
                    currSong.id === Song.id ?
                        <div
                            className={`progress ${lightMode ? '' : 'night'}`}
                            // style={{ width: `${(songRawTime / Song.duration) * 100}%`, }}
                            style={{ width: `${(rawPlayTime / Song.duration) * 100}%`, }}
                        >
                            <i
                                className={`fa-solid fa-circle ${lightMode ? '' : 'night'}`}
                            ></i>

                        </div>
                        :
                        // ''
                        <i
                            className={`fa-solid fa-circle ${lightMode ? '' : 'night'}`}
                        ></i>
                }
            </div>
        </div>

    );
};

export default ProgressBar;