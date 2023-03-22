import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getCommentsBySong, createComment, removeComment } from "../../store/comments";
// import { getSongs } from '../../store/songs';

export default function CommentTesting() {
    const dispatch = useDispatch();

    // const {songId} = useParams();
    const songId = 1
    const Comments = useSelector(state => state.comments.allComments);
    const User = useSelector(state => state.session.user)

    const [comment, setComment] = useState('')




    useEffect(() => {
        dispatch(getCommentsBySong(songId))
    }, [])

    const submitHandler = async (e) => {
        e.preventDefault()

        const newComment = await dispatch(createComment(songId, comment))

        await dispatch(getCommentsBySong(songId))

        setComment('')
    }

    const deleteHandler = async (commentId) => {
        dispatch(removeComment(commentId, songId))
    }

    const commentArr = Object.values(Comments)

    return (
        <div>
            <form
                onSubmit={submitHandler}
            >
                <input
                    type='text'
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                />
                <button>submit</button>
            </form>
            {commentArr.map(el => (
                <>
                    <li>
                        {el.comment}
                    </li>
                    <div>{el.userId === User.id ?
                        <>
                            <button>edit</button>
                            <button
                                onClick={() => deleteHandler(el.id)}
                            >delete</button>
                        </>
                        : null}</div>
                </>
            ))}
        </div>
    )
}