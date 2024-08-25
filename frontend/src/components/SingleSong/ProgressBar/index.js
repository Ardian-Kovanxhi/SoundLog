import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './ProgressBar.scss'
import { usePage } from '../../../context/Page';
import { useAudio } from '../../../context/Audio';

const ProgressBar = ({ onSeek }) => {
    const [isSeeking, setIsSeeking] = useState(false);
    const progressBarRef = useRef(null);

    const Song = useSelector(state => state.songs.singleSong);
    const currSong = useSelector(state => state.songs.playingSong);
    // const songRawTime = useSelector(state => state.audioState.runtimeState.raw);
    // const songTime = useSelector(state => state.audioState.runtimeState.str);
    let time = ''

    const { lightMode } = usePage();
    const { rawPlayTime, strPlayTime } = useAudio();

    if (Song.duration) {
        const mins = Math.floor(Song.duration / 60)
        const secs = Song.duration - (mins * 60)

        time = `${mins < 10 ? `0${mins}` : mins}:${secs < 10 ? `0${secs}` : secs}`
    }

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
                        // style={{
                        //     color: 'green',
                        //     fontSize: 'large',
                        //     position: 'sticky',
                        //     left: '0'
                        // }}
                        ></i>
                }
                {/* <div
                    style={{
                        height: '20px',
                        width: '20px',
                        // backgroundColor: 'gray',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        marginTop: '5px',
                        // marginBottom: '10px'
                    }}
                >
                </div> */}
            </div>
        </div>

    );
};

export default ProgressBar;