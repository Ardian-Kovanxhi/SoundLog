import React, { useEffect, useState } from 'react'
import { getSong, editSong } from '../../store/songs'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import './SongEditPage.css'

export default function SongEditPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user)
    const sessionSong = useSelector((state) => state.songs.singleSong)

    const { songId } = useParams();

    useEffect(() => {
        dispatch(getSong(songId))
    }, [])

    const songUrl = sessionSong.content
    const [name, setName] = useState(sessionSong.name);
    const [image, setImage] = useState(sessionSong.img);
    const [description, setDescription] = useState(sessionSong.description);
    const [errors, setErrors] = useState([]);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (image === '') setImage(null)
        if (description === '') setDescription(null)

        dispatch(editSong(songId, {
            name,
            img: image,
            description,
            content: songUrl
        }))



        history.push(`/songs/${songId}`)
    }

    return (
        <div className='song-edit-div'>
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