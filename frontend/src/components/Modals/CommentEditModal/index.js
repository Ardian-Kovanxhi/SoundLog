import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { editComment, getCommentById, getCommentsBySong } from '../../../store/comments';
import { useModal } from '../../../context/Modal.js'
import { usePage } from '../../../context/Page.js';
import './CommentEditModal.scss'

export default function CommentEditModal({ commentId, songId }) {
    // const { songId, commentId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal()

    // const sessionUser = useSelector((state) => state.session.user)
    const sessionComment = useSelector((state) => state.comments.allComments[commentId])

    const { lightMode } = usePage();


    const [comment, setComment] = useState(sessionComment.comment);

    const [focus, setFocus] = useState(false)

    const comClass = `label-in-div comment ${focus ? 'focus' : ''} ${lightMode ? '' : 'night'}`

    const submitHandler = async (e) => {
        e.preventDefault();

        if (comment.length < 1) {
            return
        }

        dispatch(editComment(commentId, {
            comment
        }))

        closeModal()

        dispatch(getCommentsBySong(songId))

        history.push(`/songs/${sessionComment.songId}`)
    }

    return (
        <div className='comment-edit-form-div'>

            <i
                className="fa-solid fa-xmark fa-2xl"
                onClick={() => closeModal()}
            ></i>

            <h1>Edit Comment</h1>

            <h4>must be at leat 1 character long</h4>

            <form className='comment-edit-form'>

                <div className={comClass}>
                    <label htmlFor="comment-id">
                        Comment:
                    </label>
                    <input
                        id='comment-id'
                        type='text'
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                        maxLength='100'
                        minLength='1'
                        onFocus={() => setFocus(true)}
                        onBlur={() => setFocus(false)}
                    />
                </div>
                <div className='chara-count-modal'>
                    {`${100 - comment.length} characters left`}
                </div>

                <button
                    onClick={submitHandler}
                >
                    Submit
                </button>
            </form>
        </div>
    )
}