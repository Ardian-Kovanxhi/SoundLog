import React, { useEffect, useState } from 'react'
import { getSong, editSong } from '../../store/songs'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { useModal } from "../../context/Modal";
import './SongEditPage.css'

//
//Actually rendered in a modal
//Didn't change file name to avoid breaking imports
//

export default function SongEditPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user)
    const sessionSong = useSelector((state) => state.songs.singleSong)
    const { closeModal } = useModal();


    const songId = sessionSong.id;

    useEffect(() => {
        dispatch(getSong(songId))
    }, [])

    // const songUrl = sessionSong.content
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
            // content: songUrl
        }))


        closeModal()
        // history.push(`/songs/${songId}`)
    }

    return (
        <div className='song-edit-div'>
            <form className='song-edit-form'>
                <div className='song-form-input-fields'>
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
                <div className='song-form-input-fields'>
                    <label>
                        {'Image: '}
                    </label>
                    <input
                        type="url"
                        onChange={(e) => setImage(e.target.value)}
                        value={image}
                        required
                    />
                </div>
                <div className='song-form-input-fields textarea'>
                    <label>
                        {'Description: '}
                    </label>
                    <textarea
                        className='song-edit-textarea'
                        type='text'
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        required
                    />
                </div>
                <button
                    onClick={submitHandler}
                    className='edit-submit-button'
                >
                    Submit
                </button>
            </form>
            <img
                className='edit-img-preview'
                src={image || 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'}
            />
        </div>
    )
}