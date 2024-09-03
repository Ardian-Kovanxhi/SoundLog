import { useDispatch, useSelector } from "react-redux"
import { clearPlayingSong, getSongs, removeSong, setCurrPage } from "../../../store/songs"
import { useParams, useHistory } from 'react-router-dom'
import OpenModalMenuItem from '../../Modals/OpenModalButton';
import SongEditModal from "../../Modals/SongEditModal";
import { useEffect, useRef, useState } from "react";
import './DropdownStyle.scss'
import { usePage } from "../../../context/Page";


export default function BtnMenu() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { songId } = useParams();

    const currSong = useSelector(state => state.songs.playingSong);
    const Songs = useSelector(state => state.songs.allSongs);
    const pageCounter = useSelector(state => state.songs.allSongsPage);

    const { lightMode } = usePage();

    const [showMenu, setShowMenu] = useState(false);
    const btnLstRef = useRef();


    const deleteHandler = async () => {
        if (currSong.id === +songId) {
            dispatch(clearPlayingSong())
        }
        const rem = await dispatch(removeSong(songId))
        if (rem.ok) {
            if (Object.keys(Songs).length === 1) {
                await dispatch(getSongs(pageCounter.currPage - 1));
                await dispatch(setCurrPage(pageCounter.currPage - 1));
            }
            history.push('/')
        }
    }

    const closeMenu = (e) => {
        if (!btnLstRef.current.contains(e.target)) {
            setShowMenu(false);
        }
    };

    useEffect(() => {
        if (showMenu) {
            document.addEventListener("mousedown", closeMenu);
        } else {
            document.removeEventListener("mousedown", closeMenu);
        }

        return () => document.removeEventListener("mousedown", closeMenu)
    }, [showMenu]);

    const ulClassName = `song-drop btn-dropdown-div${showMenu ? "" : " hidden"}${lightMode ? '' : ' night'}`;

    return (
        <div className={`btn-drop-container song-elip ${lightMode ? '' : 'night'}`}>
            <button
                className="elip-btn"
                onClick={() => setShowMenu(true)}
            >
                <i className="fa-solid fa-ellipsis-vertical" />
            </button>
            <div>

                <div
                    className={ulClassName}
                    ref={btnLstRef}
                    onClick={() => setShowMenu(closeMenu)}
                >
                    <OpenModalMenuItem
                        buttonText='Edit'
                        modalComponent={<SongEditModal />}
                    />

                    <button
                        onClick={() => deleteHandler()}
                    >
                        Delete
                    </button>

                </div>
            </div>
        </div>
    )

}