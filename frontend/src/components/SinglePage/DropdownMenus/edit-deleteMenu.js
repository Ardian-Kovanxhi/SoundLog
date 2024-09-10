import { useDispatch, useSelector } from "react-redux"
import { clearPlayingSong, removeSong } from "../../../store/songs"
import { useParams, useHistory } from 'react-router-dom'
import OpenModalMenuItem from '../../Modals/OpenModalButton';
import SongEditModal from "../../Modals/SongEditModal";
import { useEffect, useRef, useState } from "react";
import { usePage } from "../../../context/Page";
import './DropdownStyle.scss'


export default function BtnMenu() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { songId } = useParams();

    const currSong = useSelector(state => state.songs.playingSong);

    const { lightMode } = usePage();

    const [showMenu, setShowMenu] = useState(false);
    const btnLstRef = useRef();


    const deleteHandler = async () => {
        if (currSong.id === +songId) {
            dispatch(clearPlayingSong())
        }
        const rem = await dispatch(removeSong(songId))
        if (rem.ok) {
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