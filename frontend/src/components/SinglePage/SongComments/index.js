import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { createComment, getCommentsBySong } from '../../../store/comments';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import OpenModalMenuItem from '../../Modals/OpenModalButton';
import LoginFormModal from '../../Modals/LoginFormModal';
import CommentBtnMenu from '../DropdownMenus/edit-deleteComment';
import userImg from '../../../images/user-img.png'
import './Comments.scss'
import { usePage } from '../../../context/Page';




export default function SongComments() {
    const dispatch = useDispatch();
    const { songId } = useParams();

    const Comments = useSelector(state => state.comments.allComments);
    const commentArr = Object.values(Comments)
    const User = useSelector(state => state.session.user)

    const { lightMode } = usePage();

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
                        className={`comment-form ${lightMode ? '' : 'night'}`}
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
                            className={`chara-count ${lightMode ? '' : 'night'}`}
                            htmlFor="comment-form-input-id">
                            {`${100 - comment.length} characters left`}
                        </label>
                    </form>
                    :
                    <div className={`conditional-bar-button ${lightMode ? '' : 'night'}`}>
                        <OpenModalMenuItem
                            buttonText="If you would like to leave a comment click here to login"
                            modalComponent={<LoginFormModal />}
                        />
                    </div>

            }


            <div
                className={`all-comments-div ${lightMode ? '' : 'night'}`}
            >

                {commentArr.map(el => (
                    <div className='single-comment-div' key={el.id}>
                        <img className='comment-pfp' src={userImg} alt='commenter pfp' />
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
                                                className={`comment-drop-comp-container ${lightMode ? '' : 'night'}`}
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