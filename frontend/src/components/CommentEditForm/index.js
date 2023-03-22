import React, { useEffect, useState } from 'react'
import { getSong, editSong } from '../../store/songs'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

export default function SongEditPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user)
    const sessionSong = useSelector((state) => state.songs.singleSong)

    // const { commentId } = useParams();
    const commentId = 1

    useEffect(() => {
        dispatch(getSong(songId))
    }, [])

    const songUrl = sessionSong.content
    const [comment, setComment] = useState(sessionSong.name);
    const [errors, setErrors] = useState([]);

    const submitHandler = async (e) => {
        e.preventDefault();

        dispatch(editSong(songId, {
            comment,
        }))



        history.push(`/songs/${songId}`)
    }

    return (
        <div>
            <form>
                <div>
                    <label>
                        {'Name: '}
                    </label>
                    <input
                        type='text'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                    />
                </div>
                <div>
                    <label>
                        {'Image: '}
                    </label>
                    <input
                        type='text'
                        onChange={(e) => setImage(e.target.value)}
                        value={image}
                        required
                    />
                </div>
                <div>
                    <label>
                        {'Description: '}
                    </label>
                    <textarea
                        type='text'
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
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