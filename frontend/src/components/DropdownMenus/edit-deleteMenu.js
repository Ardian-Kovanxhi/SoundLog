import { useDispatch } from "react-redux"
import { removeSong } from "../../store/songs"
import { useParams, useHistory } from 'react-router-dom'
import OpenModalMenuItem from '../OpenModalButton';
import SongEditPage from "../SongEditPage";
import { useEffect, useRef, useState } from "react";
import './DropdownStyle.css'


export default function BtnMenu() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { songId } = useParams();
    const [showMenu, setShowMenu] = useState(false);
    const btnLstRef = useRef();


    const deleteHandler = async () => {
        const rem = await dispatch(removeSong(songId))
        if (rem.ok) {
            history.push('/')
        }
    }


    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!btnLstRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const ulClassName = "song-drop btn-dropdown-div" + (showMenu ? "" : " hidden");

    return (
        <div className="btn-drop-container">
            <button
                onClick={openMenu}
            >
                <i class="fa-solid fa-ellipsis-vertical" />
            </button>
            <div>

                <div
                    className={ulClassName}
                    ref={btnLstRef}
                >
                    <OpenModalMenuItem
                        buttonText='Edit'
                        onItemClick={closeMenu}
                        modalComponent={<SongEditPage />}
                    />

                    <button
                        onClick={deleteHandler}
                    >
                        Delete
                    </button>

                </div>
            </div>
        </div>
    )

}