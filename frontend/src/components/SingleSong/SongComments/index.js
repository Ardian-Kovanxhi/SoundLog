import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { createComment, getCommentsBySong } from '../../../store/comments';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import OpenModalMenuItem from '../../Modals/OpenModalButton';
import LoginFormModal from '../../Modals/LoginFormModal';
import CommentBtnMenu from '../DropdownMenus/edit-deleteComment';
import userImg from '../../../images/user-img.png'
import './Comments.css'




export default function SongComments() {
    const dispatch = useDispatch();
    const { songId } = useParams();

    const Comments = useSelector(state => state.comments.allComments);
    const commentArr = Object.values(Comments)
    const User = useSelector(state => state.session.user)
    const pageState = useSelector(state => state.global.lightState)

    const [comment, setComment] = useState('');

    let disabled = false

    if (User) {
        disabled = true
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        await dispatch(createComment(songId, comment))

        await dispatch(getCommentsBySong(songId))

        setComment('')
    }

    return (

        <div className='comments-container-div'>

            {
                User ?
                    <form
                        onSubmit={submitHandler}
                        className={`comment-form ${pageState ? '' : 'night'}`}
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
                        <label
                            className={`chara-count ${pageState ? '' : 'night'}`}
                            for="comment-form-input-id">
                            {`${100 - comment.length} characters left`}
                        </label>
                    </form>
                    :
                    <div className={`conditional-bar-button ${pageState ? '' : 'night'}`}>
                        <OpenModalMenuItem
                            buttonText="If you would like to leave a comment click here to login"
                            modalComponent={<LoginFormModal />}
                        />
                    </div>

            }


            <div
                className={`all-comments-div ${pageState ? '' : 'night'}`}
            >

                {commentArr.map(el => (
                    <div className='single-comment-div'>
                        <img className='comment-pfp' src={userImg} />
                        <div>
                            <div>
                                <div className='username-conditional-div'>
                                    {el.User.username}

                                    {disabled ?
                                        el.userId === User.id
                                            ||
                                            User.id === 1
                                            ?
                                            <div
                                                // className='comment-drop-comp-container'
                                                className={`comment-drop-comp-container ${pageState ? '' : 'night'}`}
                                            >
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