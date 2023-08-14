import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

const ProgressBar = ({ onSeek }) => {
    const [isSeeking, setIsSeeking] = useState(false);
    const progressBarRef = useRef(null);

    const Song = useSelector(state => state.songs.singleSong);
    const currSong = useSelector(state => state.songs.playingSong);
    const songRawTime = useSelector(state => state.audioState.runtimeState.raw);
    const songTime = useSelector(state => state.audioState.runtimeState.str);
    let time = ''

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
        <div
            style={{
                backgroundColor: 'green',
                color: 'white',
                display: 'flex',
                width: '680px',
                flexDirection: 'column',
                padding: '10px',
                borderRadius: '10px'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    width: '670px',
                    justifyContent: 'space-between',
                    marginBottom: '5px'
                }}
            >
                <div>
                    {currSong.id === Song.id ? songTime : '00:00'}
                </div>

                <div>
                    {time}
                </div>
            </div>

            <div
                className="progress-bar"
                ref={progressBarRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                style={{
                    // backgroundColor: 'rgba(0,0,0, .5)',
                    // backgroundColor: 'white',
                    backgroundColor: 'lightgreen',
                    cursor: 'pointer',
                    width: '670px',
                    height: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    borderRadius: '10px',
                    // overflow: 'hidden'
                }}
            >
                {
                    currSong.id === Song.id ?
                        <div
                            className="progress"
                            style={{
                                width: `${(songRawTime / Song.duration) * 100}%`,
                                maxWidth: '700px',
                                height: '10px',
                                backgroundColor: 'rgb(155,110,66)',
                                // zIndex: '20'
                                borderRadius: '5px'
                            }}></div>
                        : ''
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
                    <img
                        src='https://i.imgur.com/zbLiFqp.png'
                        style={{
                            height: '40px',
                            width: '40px',
                            transform: 'scaleX(-1)'
                        }}
                    />
                    <i
                        className="fa-solid fa-circle"
                        style={{
                            color: 'green',
                            fontSize: 'x-large'
                        }}
                    ></i>

                </div> */}
            </div>
        </div>

    );
};

export default ProgressBar;