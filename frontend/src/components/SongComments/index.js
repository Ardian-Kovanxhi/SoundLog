import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { createComment } from '../../store/comments';
import { getCommentsBySong } from "../../store/comments";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import OpenModalMenuItem from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import CommentBtnMenu from '../DropdownMenus/edit-deleteComment';
import './Comments.css'




export default function SongComments() {
    const dispatch = useDispatch();
    const { songId } = useParams();

    const Comments = useSelector(state => state.comments.allComments);
    const commentArr = Object.values(Comments)
    const User = useSelector(state => state.session.user)

    const [comment, setComment] = useState('');

    let disabled = false

    if (User) {
        disabled = true
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        const newComment = await dispatch(createComment(songId, comment))

        await dispatch(getCommentsBySong(songId))

        setComment('')
    }

    return (

        <div className='comments-container-div'>

            {
                User ?
                    <form
                        onSubmit={submitHandler}
                        className='comment-form'
                    >
                        <input
                            id='comment-form-input-id'
                            type='text'
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                            maxLength='100'
                            required
                            placeholder='Write a comment here'
                        />
                        <label className='chara-count' for="comment-form-input-id">
                            {`${100 - comment.length} characters left`}
                        </label>
                    </form>
                    :
                    <div className='conditional-bar-button'>
                        <OpenModalMenuItem
                            buttonText="If you would like to leave a comment click here to login"
                            modalComponent={<LoginFormModal />}
                        />
                    </div>

            }


            <div className='all-comments-div'>

                {commentArr.map(el => (
                    <div className='single-comment-div'>
                        <img className='comment-pfp' src='https://cdn-icons-png.flaticon.com/512/149/149071.png' />
                        <div>
                            <div>
                                <div className='username-conditional-div'>
                                    {el.User.username}

                                    {disabled ? el.userId === User.id ?
                                        <div className='comment-drop-comp-container'>
                                            <CommentBtnMenu passedCommId={el.id} />
                                        </div>
                                        : null : null}

                                </div>
                            </div>
                            <div>
                                {el.comment}
                            </div>
                        </div>

                    </div>

                ))}
            </div>

        </div>
    )
}