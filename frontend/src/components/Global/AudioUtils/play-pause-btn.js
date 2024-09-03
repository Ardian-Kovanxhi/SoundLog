import { useDispatch, useSelector } from "react-redux";
import { useAudio } from "../../../context/Audio";
import { usePage } from "../../../context/Page";
import { playSong } from "../../../store/songs";

export default function PlayPauseBtn({ songId, classTag, big }) {
    const dispatch = useDispatch();

    const currSong = useSelector(state => state.songs.playingSong);
    const { pauseState, setPauseState } = useAudio();
    const { lightMode } = usePage();

    return (
        <>
            {currSong.id === songId ?

                pauseState ?

                    <button
                        className={` ${classTag}${lightMode ? '' : ' night'}`}
                        onClick={() => { setPauseState(false) }}
                    >

                        <i className={`fa-solid fa-play ${big ? "fa-2xl" : ""}`} />

                    </button> :

                    <button
                        className={`pause ${classTag}${lightMode ? '' : ' night'}`}
                        onClick={() => { setPauseState(true) }}
                    >

                        <i className={`fa-solid fa-pause ${big ? "fa-2xl" : ""} single-pause`} />

                    </button> :

                <button
                    className={` ${classTag}${lightMode ? '' : ' night'}`}
                    onClick={() => dispatch(playSong(songId))}
                >

                    <i className={`fa-solid fa-play ${big ? "fa-2xl" : ""}`} />

                </button>
            }
        </>
    )
}