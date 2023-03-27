import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { editComment, getCommentById, getCommentsBySong } from '../../store/comments';

export default function CommentEditPage() {
    // const commentId = 4
    const { songId, commentId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getCommentById(commentId))
        dispatch(getCommentsBySong(songId))
    }, [])

    // const sessionUser = useSelector((state) => state.session.user)
    // const sessionComment = useSelector((state) => state.comments.singleComment)
    const sessionComment = useSelector((state) => state.comments.allComments[commentId])



    const [comment, setComment] = useState(sessionComment.comment);
    // const [comment, setComment] = useState('');
    // const [errors, setErrors] = useState([]);

    const submitHandler = async (e) => {
        e.preventDefault();

        dispatch(editComment(commentId, {
            comment
        }))



        history.push(`/songs/${sessionComment.songId}`)
    }

    return (
        <div>
            <form>
                <div>
                    <label>
                        {'Comment: '}
                    </label>
                    <input
                        type='text'
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                        required
                    />
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