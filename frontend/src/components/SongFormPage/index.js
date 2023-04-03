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

    useEffect(() => {

        const detected = []

        if (content) {
            const fileType = content.name.split('.')[1]
            if (fileType !== 'mp3') {
                detected.push('incorrect file type')
                setErrors(detected)
            }
        }
    }, [content])

    const submitHandler = async (e) => {
        e.preventDefault();
        test_loading = true

        if (img === '') setImg(null)
        if (description === '') setDescription(null)

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
            <form onSubmit={submitHandler}>
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
                        {'Song: '}
                    </label>
                    {/* <input
                        type='text'
                        onChange={(e) => setContent(e.target.value)}
                        value={content}
                        required
                    /> */}
                    <input type="file" onChange={updateFile} />
                </div>
                <img
                    className="new-song-img"
                    src={img || 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'} />
                <div>
                    <label>
                        {'ImageUrl: '}
                    </label>
                    <input
                        type='text'
                        onChange={(e) => setImg(e.target.value)}
                        value={img}
                    />
                </div>
                <div>
                    <label>
                        {'Description: '}
                    </label>
                    <input
                        type='text'
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />
                </div>
                <button>Submit</button>
            </form>
        </div>
    )

}