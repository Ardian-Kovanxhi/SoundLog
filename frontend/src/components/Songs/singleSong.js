import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { getCommentsBySong } from "../../store/comments";
import { getSong, removeSong } from '../../store/songs';
import { removeComment, createComment } from '../../store/comments';
import LoginFormModal from '../LoginFormModal';
import OpenModalMenuItem from '../OpenModalButton';
import CommentEditModal from '../CommentEditModal';
import './Songs.css'



export default function SingleSong() {
    const dispatch = useDispatch();
    const history = useHistory()
    const { songId } = useParams();
    const Song = useSelector(state => state.songs.singleSong);
    const Comments = useSelector(state => state.comments.allComments);
    const User = useSelector(state => state.session.user)
    const [comment, setComment] = useState('');
    let disabled = false

    if (User) {
        disabled = true
    }

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
            <li>
                <audio controls src={Song.content}>
                    {/* <source src={Song.content} type='audio/mpeg' /> */}
                </audio>
            </li>
            <li>
                <img src={
                    Song.img
                    ||
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'
                } />
            </li>
            <li>{Song.description}</li>
            <div>
                {User ? Song.userId === User.id ?
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
                    null : null
                }
                ----------------------------------------------------------------------------------
            </div>
            {
                User ?
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
                    :
                    <OpenModalMenuItem
                        buttonText="Log In"
                        modalComponent={<LoginFormModal />}
                    />

            }
            <div>
                {commentArr.map(el => (
                    <>
                        <li>
                            {el.comment}
                        </li>

                        <div>{disabled ? el.userId === User.id ?
                            <>
                                {/* <button
                                    onClick={() => history.push(`/songs/${songId}/comments/${el.id}/edit`)}
                                >Edit</button> */}
                                <OpenModalMenuItem
                                    // itemText="Test"
                                    buttonText='Edit'
                                    modalComponent={<CommentEditModal commentId={el.id} songId={songId} />}
                                />
                                <button
                                    onClick={() => commentDeleteHandler(el.id)}
                                >Delete</button>
                            </>
                            : null : null}</div>
                    </>

                ))}
            </div>

        </div >

    )
}