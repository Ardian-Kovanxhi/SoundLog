import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { getCommentsBySong } from "../../store/comments";
import { getSong, removeSong } from '../../store/songs';
import { removeComment, createComment } from '../../store/comments';

export default function SingleSong() {
    const dispatch = useDispatch();
    const history = useHistory()
    const { songId } = useParams();
    // const songId = 1
    // const Song = useSelector(state => state.songs.singleSong);
    const Song = useSelector(state => state.songs.singleSong);
    const Comments = useSelector(state => state.comments.allComments);
    const User = useSelector(state => state.session.user)
    const [comment, setComment] = useState('');

    useEffect(() => {
        dispatch(getSong(songId))
        dispatch(getCommentsBySong(songId))
    }, [])

    const commentArr = Object.values(Comments)

    const submitHandler = async (e) => {
        e.preventDefault()

        const newComment = await dispatch(createComment(songId, comment))

        await dispatch(getCommentsBySong(songId))

        setComment('')
    }


    const deleteHandler = async () => {
        const rem = await dispatch(removeSong(songId))
        if (rem.ok) {
            history.push('/')
        }
    }

    const commentDeleteHandler = async (commentId) => {
        dispatch(removeComment(commentId, songId))
    }


    return (
        <div>
            <li>{Song.id}</li>
            <li>{Song.name}</li>
            <li>{Song.content}</li>
            <li>{Song.img}</li>
            <li>{Song.description}</li>
            <div>
                {Song.userId === User.id ?
                    <>
                        <button
                            onClick={(e) => history.push(`/songs/${songId}/edit`)}
                        >edit</button>
                        <div>
                            <button
                                onClick={deleteHandler}
                            >delete</button>
                        </div>
                    </>
                    :
                    null
                }
                ----------------------------------------------------------------------------------
            </div>
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
            <div>
                {commentArr.map(el => (
                    <>
                        <li>
                            {el.comment}
                        </li>

                        <div>{el.userId === User.id ?
                            <>
                                <button
                                    onClick={() => history.push(`/songs/${songId}/edit`)}
                                >Edit</button>
                                <button
                                    onClick={() => commentDeleteHandler(el.id)}
                                >Delete</button>
                            </>
                            : null}</div>
                    </>

                ))}
            </div>

        </div>

    )
}