import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './ProgressBar.css'

const ProgressBar = ({ onSeek, listSong }) => {
    const [isSeeking, setIsSeeking] = useState(false);
    const progressBarRef = useRef(null);

    const currSong = useSelector(state => state.songs.playingSong);
    const songRawTime = useSelector(state => state.audioState.runtimeState.raw);
    const songTime = useSelector(state => state.audioState.runtimeState.str);
    const pageState = useSelector(state => state.global.lightState);
    let time = ''

    if (listSong.duration) {
        const mins = Math.floor(listSong.duration / 60)
        const secs = listSong.duration - (mins * 60)

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
        <div className={`progress-container-list ${pageState ? '' : 'night'}`}>

            <div className='time-div-list'>

                {/* <div> */}
                {currSong.id === listSong.id ? songTime : '--:--'}
                {/* </div> */}

                {/* <div>
                    {time}
                </div> */}

            </div>

            <div
                className={`progress-bar-list ${pageState ? '' : 'night'}`}
                ref={progressBarRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                {
                    currSong.id === listSong.id ?
                        <div
                            className={`progress-list ${pageState ? '' : 'night'}`}
                            style={{ width: `${(songRawTime / listSong.duration) * 100}%`, }}
                        >
                            <i
                                className={`fa-solid fa-circle ${pageState ? '' : 'night'}`}
                            ></i>

                        </div>
                        :
                        <i
                            className={`fa-solid fa-circle ${pageState ? '' : 'night'}`}
                        ></i>
                }
            </div>
            <div>
                {time}
            </div>
        </div>

    );
};

export default ProgressBar;