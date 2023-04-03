import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { submitSong } from "../../store/songs";
import './SongFormPage.css'

export default function SongFormPage() {
    const dispatch = useDispatch();
    const history = useHistory()

    const user = useSelector(state => state.session.user);
    let test_loading = false

    const [name, setName] = useState('')
    const [content, setContent] = useState(null)
    // const [content, setContent] = useState('')
    const [img, setImg] = useState('')
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState([])

    // useEffect(() => {

    //     const detected = []

    //     if (content) {
    //         const fileType = content.name.split('.')[1]
    //         if (fileType !== 'mp3') {
    //             detected.push('incorrect file type')
    //             setErrors(detected)
    //         }
    //     }
    // }, [content])

    const submitHandler = async (e) => {
        e.preventDefault();
        test_loading = true
        const detected = []

        if (img === '') setImg(null)
        if (description === '') setDescription(null)

        if (content) {
            const fileType = content.name.split('.')[1]
            if (fileType !== 'mp3') {
                detected.push('incorrect file type')
                setErrors(detected)
                return
            }
        }

        const newSong = await dispatch(submitSong({
            ownerId: user.id,
            name,
            content,
            img,
            description
        }))



        history.push(`/songs/${newSong.id}`)
    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setContent(file);
    };

    return (
        <div className="song-form-div">

            <ul>
                {errors.map(el => (
                    <li>
                        {el}
                    </li>
                ))}
            </ul>

            <form onSubmit={submitHandler} className="new-song-form">

                * required fields
                <div className="all-content-div">

                    <div className="name-song-desc-div">

                        <div className="song-form-input-fields">

                            <label>
                                {'Name*'}
                            </label>
                            <input
                                type='text'
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                required
                            />
                        </div>

                        <div className="song-form-input-fields">

                            {'Song* (only accepts mp3 files)'}
                            <label>
                                <input className="file-select-input" type="file" accept=".mp3" required onChange={updateFile} />
                            </label>

                        </div>

                        <div className="song-form-input-fields">

                            <label>
                                {'Description'}
                            </label>

                            <textarea
                                className="song-form-textarea"
                                type='text'
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                            />

                        </div>

                    </div>

                    <div className="new-song-img-assignment">

                        <div className="song-form-input-fields img">
                            <label>
                                {'ImageUrl: '}
                            </label>

                            <input
                                type='text'
                                onChange={(e) => setImg(e.target.value)}
                                value={img}
                            />

                        </div>

                        <img
                            className="new-song-img"
                            src={img || 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'} />

                    </div>

                </div>


                <div className="song-form-gen-but-div">

                    <button className="song-form-buttons submit">Submit</button>

                    <button onClick={() => history.push('/')} className="song-form-buttons cancel">Cancel</button>

                </div>
            </form>
        </div>
    )

}