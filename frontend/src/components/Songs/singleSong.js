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
            {/* <li>{Song.content}</li> */}
            <li>
                <audio controls>
                    <source src='https://aa-sounclod-clone-bucket.s3.us-east-1.amazonaws.com/Boo-womp.mp3?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLWVhc3QtMSJGMEQCID0uk5shoW%2FugB%2BKYiCMpwhxpo2Z7Go7IksjbuS9eJjPAiBGszR5qvl770D4FkRq911WGvb989vtwCfyUPamCrT2rCrkAggmEAAaDDQyNDgyOTI3MTczNCIMdwkxrlY%2F7JxlWEYFKsEC0%2B0yPGbwXh8SWKA5xX45ZSrEOey8VzX5T9TZ8GMOhc2tYtNOQzuSFyHZrXiNKL8cU%2FnFvR6g7XTvUsImSHo%2B6XtLwk6lklXfR79jeJyuC0oWw7adatQkaGJcW9GzGLCJpOq8YMWr55ve5wRpej2FqoLO%2F9uQBg8bx1OqpwGTgZKfc5eMXedrO8rnyghq0IUm0Nvx3Bz13SXl3L0ZiLl%2BQ9jvQHUbV%2BeMc2o%2FE10EHIsRO0gGSkuKQcc1dg5EJsUBZOwblFPx2HNsWP5QH98whhiEVp1tW1nzUc1Z3CpO7%2BTeikosfQaAGe6wMmGvdZzk%2B53SvsMFhjK2tvlthylY0lyAWUu54r%2BYPJOj0VwG9g8p0hG4Wpx%2BWDNn3I9tIIkAfFXsDZAGbh4OBiz0oe3%2Be6fpmtwXYKoIqMFQeIef8x%2F2MNa4hKEGOrQCkeqznKSJ4yN31XnUmzMIIxdSujlJRu5zuDG63aEeCsHXIe2TZtOoItZsbKkOoZOmaY342LuJngcsueLL4ItcXgIhHCSZag4keuhnj%2BsYLaiQ3GFVEfke4jqteRnwwFPeNxMazhdKKHR1HC8o8z0o6GmQXsAXsMPhUiokD2YpjATWf%2FRnr0jZaFVoKm2oxxHt4hK0z2ygryk9xjpuzm%2FVdc8WcJXCJJ9%2FLvjrPFnGNjW9HKwG8rLdSYav1Yh%2FD1mzZBUzPSrTowbNBl57bVTzWfm%2FckZYF%2BHsgA6ZUPloF9bMG5s%2BkskXABuIaxK7ttwRTMEXhaeUBN5saEvYo1V7AD7nnMc2doZJ0fOYT%2BFy%2B6pa3ulDbxwc7AvFXBNkNhIwaRo9%2B6t4sIYIrOihF%2F6rWwB0nlM%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230327T143949Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIAWF2OMH23M5ZTD2MU%2F20230327%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=f153764cacf8cc00024a90ce8c06a43d279151610e35e4ccd6c0c70dbf3f30cb' type='audio/mpeg' />
                    {/* <source src={Song.content} type='audio/mpeg' /> */}
                </audio>
            </li>
            <li>{Song.img}</li>
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