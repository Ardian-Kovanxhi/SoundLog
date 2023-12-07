import React, { useEffect, useState } from 'react'
import { getSong, editSong } from '../../../store/songs'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { useModal } from "../../../context/Modal";
import './SongEditPage.css'

//
//Actually rendered in a modal
//Didn't change file name to avoid breaking imports
//

export default function SongEditModal() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const sessionSong = useSelector((state) => state.songs.singleSong)
    const pageState = useSelector((state) => state.global.lightState)
    const { closeModal } = useModal();


    const songId = sessionSong.id;

    useEffect(() => {
        dispatch(getSong(songId))
    }, [])

    // const songUrl = sessionSong.content
    const [name, setName] = useState(sessionSong.name);
    const [image, setImage] = useState(sessionSong.img);
    const [description, setDescription] = useState(sessionSong.description);
    const [content, setContent] = useState(sessionSong.content)
    const [duration, setDuration] = useState(sessionSong.duration)

    const [nameFocus, setNameFocus] = useState(false)
    const [descFocus, setDescFocus] = useState(false)
    const [imgFocus, setImgFocus] = useState(false)
    const [songFocus, setSongFocus] = useState(false)
    const [durationFocus, setDurationFocus] = useState(false)

    const genClass = `label-in-div ${pageState ? '' : 'night'}`

    const nClass = genClass + (nameFocus ? ' focus' : '')
    const dClass = genClass + (descFocus ? ' focus' : '')
    const iClass = genClass + (imgFocus ? ' focus' : '') + ' imgUrl'
    const sClass = genClass + (songFocus ? ' focus' : '')
    const durClass = genClass + (durationFocus ? ' focus' : '')

    const submitHandler = async (e) => {
        e.preventDefault();

        if (image === '') setImage(null)
        if (description === '') setDescription(null)

        dispatch(editSong(songId, {
            name,
            content,
            duration,
            img: image,
            description,
            // content: songUrl
        }))


        closeModal()
        // history.push(`/songs/${songId}`)
    }

    return (
        <div className='song-edit-div'>
            <i
                className="fa-solid fa-xmark fa-2xl"
                onClick={() => closeModal()}
            ></i>

            <h1>Edit Song</h1>

            <form className='song-edit-form'>

                <div
                    className='input-gen-div'
                >
                    <div className='name-desc-input-div'>

                        <div className={nClass}>
                            <label htmlFor="edit-name-id">
                                Name
                            </label>
                            <input
                                id="edit-name-id"
                                type='text'
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                required
                                onFocus={() => setNameFocus(true)}
                                onBlur={() => setNameFocus(false)}
                            />
                        </div>

                        {user.id === 1 ?
                            <>
                                <div className={sClass}>
                                    <label htmlFor="edit-song-id">
                                        Song URL
                                    </label>
                                    <input
                                        id='edit-song-id'
                                        type='text'
                                        onChange={(e) => setContent(e.target.value)}
                                        value={content}
                                        required
                                        onFocus={() => setSongFocus(true)}
                                        onBlur={() => setSongFocus(false)}
                                    />
                                </div>

                                <div className={durClass}>
                                    <label htmlFor="edit-duration-id">
                                        Duration
                                    </label>
                                    <input
                                        id='edit-duration-id'
                                        type='text'
                                        onChange={(e) => setDuration(e.target.value)}
                                        value={duration}
                                        required
                                        onFocus={() => setDurationFocus(true)}
                                        onBlur={() => setDurationFocus(false)}
                                    />
                                </div>
                            </>
                            : ''}


                        <div className={dClass}>
                            <label htmlFor="edit-desc-id">
                                Description
                            </label>
                            <textarea
                                id='edit-desc-id'
                                className='song-edit-textarea'
                                type='text'
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                                required
                                onFocus={() => setDescFocus(true)}
                                onBlur={() => setDescFocus(false)}
                            />
                        </div>

                    </div>

                    <div className='img-in-div'>

                        <div className={iClass}>
                            <label htmlFor="edit-img-id">
                                Image
                            </label>
                            <input
                                id='edit-img-id'
                                type="url"
                                onChange={(e) => setImage(e.target.value)}
                                value={image}
                                required
                                onFocus={() => setImgFocus(true)}
                                onBlur={() => setImgFocus(false)}
                            />
                        </div>

                        <img
                            className='edit-img-preview'
                            src={image || 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'}
                        />

                    </div>

                </div>

                <button
                    onClick={submitHandler}
                    className='edit-submit-button'
                >
                    Submit
                </button>
            </form>
        </div>
    )
}