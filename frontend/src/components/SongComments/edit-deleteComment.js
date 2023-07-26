import { useDispatch } from "react-redux"
import { useParams, useHistory } from 'react-router-dom'
import OpenModalMenuItem from '../OpenModalButton';
import CommentEditModal from "../CommentEditModal";
import { removeComment } from "../../store/comments";
import { useEffect, useRef, useState } from "react";

export default function CommentBtnMenu({ passedCommId }) {
    const dispatch = useDispatch()
    const { songId } = useParams();
    const [showMenu, setShowMenu] = useState(false);
    const cbtnLstRef = useRef();


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

    const ulClassName = "comment-drop btn-dropdown-div" + (showMenu ? "" : " hidden");

    return (
        <div className="btn-drop-container">
            <button
                onClick={openMenu}
            >
                <i class="fa-solid fa-ellipsis-vertical" />
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