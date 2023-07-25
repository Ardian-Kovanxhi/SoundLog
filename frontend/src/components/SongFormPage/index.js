import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { submitSong } from "../../store/songs";
import CommentTesting from "../CommentFormTesting";
import './SongFormPage.css'

export default function SongFormPage() {
    const dispatch = useDispatch();
    const history = useHistory()

    const user = useSelector(state => state.session.user);

    const [name, setName] = useState('')
    const [content, setContent] = useState(null)
    const [img, setImg] = useState('')
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState([])
    const [loadState, setLoadState] = useState(true)

    const [nameFocus, setNameFocus] = useState(false)
    const [songFocus, setSongFocus] = useState(false)
    const [descFocus, setDescFocus] = useState(false)
    const [imgFocus, setImgFocus] = useState(false)

    const genClass = 'label-in-div-song-form '

    const nClass = genClass + (nameFocus ? 'focus-song-form' : '')
    const sClass = genClass + (songFocus ? 'focus-song-form' : '')
    const dClass = genClass + (descFocus ? 'focus-song-form' : '') + ' desc'
    const iClass = genClass + (imgFocus ? 'focus-song-form' : '') + ' img'
    const iBoxClass = 'new-song-img-assignment ' + (imgFocus ? 'focus-img-box' : '')

    useEffect(() => {

        if (!user) {
            history.push('/')
        }

    }, [user])

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoadState(false)

        if (img === '') setImg(null)
        if (description === '') setDescription(null)

        // if (content) {
        //     const fileType = content.name.split('.')[1]
        //     if (fileType !== 'mp3') {
        //         detected.push('incorrect file type')
        //         setErrors(detected)
        //         return
        //     }
        // }

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

        <>
            {
                loadState ?
                    <div className="song-form-div">

                        <ul>
                            {errors.map(el => (
                                <li>
                                    {el}
                                </li>
                            ))}
                        </ul>

                        <form onSubmit={submitHandler} className="new-song-form">

                            <div className="required notif">
                                * required fields
                            </div>

                            <div className="all-content-div">

                                <div className="name-song-desc-div">

                                    <div className={nClass}>

                                        <label for="name-in-id" className="required" >
                                            Name*
                                        </label>
                                        <input
                                            id="name-in-id"
                                            // className="form-colored-input"
                                            type='text'
                                            onChange={(e) => setName(e.target.value)}
                                            value={name}
                                            required
                                            onFocus={() => setNameFocus(true)}
                                            onBlur={() => setNameFocus(false)}
                                        />
                                    </div>

                                    <div className={sClass}>

                                        <label for="mp3-in-id" className="required mp3-in-class">
                                            Song* (only accepts mp3 files)
                                        </label>
                                        <input
                                            id="mp3-in-id"
                                            className="file-select-input"
                                            type="file"
                                            accept=".mp3"
                                            required onChange={updateFile}
                                            onFocus={() => setSongFocus(true)}
                                            onBlur={() => setSongFocus(false)}
                                        />

                                    </div>

                                    <div className={dClass}>

                                        <label for='desc-id' className="text-label" >
                                            Description
                                        </label>

                                        <textarea
                                            id="desc-id"
                                            className="song-form-textarea form-colored-input"
                                            type='text'
                                            onChange={(e) => setDescription(e.target.value)}
                                            value={description}
                                            onFocus={() => setDescFocus(true)}
                                            onBlur={() => setDescFocus(false)}
                                        />

                                    </div>

                                </div>

                                <div className={iBoxClass}>

                                    <div className={iClass}>
                                        <label for='img-id' className="text-label">
                                            ImageUrl:
                                        </label>

                                        <input
                                            className="form-colored-input in-test-class"
                                            id="img-id"
                                            type='url'
                                            onChange={(e) => setImg(e.target.value)}
                                            value={img}
                                            onFocus={() => setImgFocus(true)}
                                            onBlur={() => setImgFocus(false)}
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
                    :
                    <div className="loader">
                        <img src="https://i.imgur.com/DwJvkT6.gif" />
                    </div>

            }
        </>
    )

}