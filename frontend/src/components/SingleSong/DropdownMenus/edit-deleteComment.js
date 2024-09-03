import { useDispatch } from "react-redux"
import { useParams } from 'react-router-dom'
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

    const closeMenu = (e) => {
        if (cbtnLstRef.current && !cbtnLstRef.current.contains(e.target)) {
            setShowMenu(false);
        }
    };

    useEffect(() => {
        if (showMenu) {
            document.addEventListener('mousedown', closeMenu);
        } else {
            document.removeEventListener('mousedown', closeMenu);
        }

        return () => {
            document.removeEventListener('mousedown', closeMenu);
        };
    }, [showMenu]);


    const ulClassName =
        "comment-drop btn-dropdown-div" +
        (showMenu ? "" : " hidden") +
        (lightMode ? '' : ' night');

    return (
        <div className={`btn-drop-container comment-elip ${lightMode ? '' : 'night'}`}>
            <button
                className="elip-btn"
                onClick={() => setShowMenu(true)}
            >
                <i className="fa-solid fa-ellipsis"></i>
            </button>
            <div
                className={ulClassName}
                ref={cbtnLstRef}
                onClick={() => setShowMenu(false)}
            >
                <OpenModalMenuItem
                    buttonText='Edit'
                    modalComponent={<CommentEditModal commentId={passedCommId} songId={songId} />}
                />

                <button
                    onClick={() => deleteHandler(passedCommId)}
                >Delete</button>
            </div>
        </div>
    )

}