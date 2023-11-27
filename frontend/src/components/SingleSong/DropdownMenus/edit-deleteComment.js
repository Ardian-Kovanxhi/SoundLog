import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from 'react-router-dom'
import OpenModalMenuItem from '../../OpenModalButton';
import CommentEditModal from "../../CommentEditModal";
import { removeComment } from "../../../store/comments";
import { useEffect, useRef, useState } from "react";
import './DropdownStyle.css'

export default function CommentBtnMenu({ passedCommId }) {
    const dispatch = useDispatch()
    const { songId } = useParams();
    const [showMenu, setShowMenu] = useState(false);
    const cbtnLstRef = useRef();
    const pageState = useSelector(state => state.global.lightState)


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
        (pageState ? '' : ' night');

    return (
        <div className={`btn-drop-container comment-elip ${pageState ? '' : 'night'}`}>
            <button
                className="elip-btn"
                onClick={openMenu}
            >
                <i class="fa-solid fa-ellipsis"></i>
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