import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from 'react-router-dom'
import OpenModalMenuItem from '../../Modals/OpenModalButton';
import CommentEditModal from "../../Modals/CommentEditModal";
import { removeComment } from "../../../store/comments";
import { useEffect, useRef, useState } from "react";
import './DropdownStyle.scss'
import { usePage } from "../../../context/Page";

export default function CommentBtnMenu({ passedCommId }) {
    const dispatch = useDispatch()
    const { songId } = useParams();
    const [showMenu, setShowMenu] = useState(false);
    const cbtnLstRef = useRef();

    const { lightMode } = usePage();


    const deleteHandler = async (commentId) => {
        dispatch(removeComment(commentId, songId))
    }


    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!cbtnLstRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const ulClassName =
        "comment-drop btn-dropdown-div" +
        (showMenu ? "" : " hidden") +
        (lightMode ? '' : ' night');

    return (
        <div className={`btn-drop-container comment-elip ${lightMode ? '' : 'night'}`}>
            <button
                className="elip-btn"
                onClick={openMenu}
            >
                <i className="fa-solid fa-ellipsis"></i>
            </button>
            <div
                className={ulClassName}
                ref={cbtnLstRef}
            >
                <OpenModalMenuItem
                    buttonText='Edit'
                    modalComponent={<CommentEditModal commentId={passedCommId} songId={songId} />}
                />

                <button
                    onClick={() => deleteHandler(passedCommId).then(closeMenu())}
                >Delete</button>
                {/* </div> */}

            </div>
        </div>
    )

}