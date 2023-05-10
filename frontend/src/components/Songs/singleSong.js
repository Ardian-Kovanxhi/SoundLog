import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { getCommentsBySong } from "../../store/comments";
import { getSong, getSongs, removeSong } from '../../store/songs';
import { removeComment, createComment } from '../../store/comments';
import LoginFormModal from '../LoginFormModal';
import SongEditPage from "../SongEditPage";
import OpenModalMenuItem from '../OpenModalButton';
import CommentEditModal from '../CommentEditModal';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './Songs.css'



export default function SingleSong() {
    const dispatch = useDispatch();
    const history = useHistory()
    const { songId } = useParams();

    useEffect(() => {
        dispatch(getSong(songId))
        dispatch(getCommentsBySong(songId))
    }, [])

    const Song = useSelector(state => state.songs.singleSong);
    const Comments = useSelector(state => state.comments.allComments);
    const User = useSelector(state => state.session.user)
    const [comment, setComment] = useState('');
    let disabled = false
    let Uploader = ''

    if (User) {
        disabled = true
    }

    if (Song.User) {
        Uploader = Song.User.username
    }

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
        <div className='single-song-container-div'>

            <div className='single-song-div'>

                <div className='single-song-info-img-div'>

                    <div className='single-song-info-div'>

                        <div className='info-buttons-div'>

                            <div>
                                <div className='pfp-info-div'>
                                    <img className='uploader-pfp' src='https://cdn-icons-png.flaticon.com/512/149/149071.png' />

                                    <div className='song-name-uploader-div'>

                                        <div className='song-name-div'>
                                            {Song.name}
                                        </div>

                                        <div className='song-uploader-div'>
                                            {Uploader}
                                        </div>

                                    </div>
                                </div>
                            </div>


                            <div>

                                {User ? Song.userId === User.id ?
                                    <div className='edit-delete-buttons-div'>
                                        <OpenModalMenuItem
                                            // itemText="Test"
                                            buttonText='Edit'
                                            modalComponent={<SongEditPage />}
                                        />

                                        <button
                                            onClick={deleteHandler}
                                        >Delete</button>

                                    </div>
                                    :
                                    null : null
                                }

                            </div>

                        </div>

                        <div>{Song.description}</div>

                        <div>
                            {/* {Song.content} */}
                            <audio controls src={Song.content} className='audio-controls'></audio>
                        </div>

                    </div>

                    <div>

                        <img
                            className='single-song-img'
                            src={
                                Song.img
                                ||
                                'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'
                            } />

                    </div>

                </div>

            </div>



            <div className='comments-gen-div'>

                {
                    User ?
                        <form
                            onSubmit={submitHandler}
                            className='comment-form'
                        >
                            <input
                                type='text'
                                onChange={(e) => setComment(e.target.value)}
                                value={comment}
                                maxLength='100'
                                required
                                placeholder='Write a comment here'
                            />
                            <div className='chara-count'>
                                {`${100 - comment.length} characters left`}
                            </div>
                            {/* <button>submit</button> */}
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
                                            <div className='comments-button-div'>
                                                <OpenModalMenuItem
                                                    // itemText="Test"
                                                    buttonText='Edit'
                                                    modalComponent={<CommentEditModal commentId={el.id} songId={songId} />}
                                                />

                                                <button
                                                    onClick={() => commentDeleteHandler(el.id)}
                                                >Delete</button>
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

        </div >

    )
}