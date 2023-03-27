import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { submitSong } from "../../store/songs";
import './SongFormPage.css'

export default function SongFormPage() {
    const dispatch = useDispatch();
    const history = useHistory()

    const user = useSelector(state => state.session.user);

    const [name, setName] = useState('')
    const [content, setContent] = useState(null)
    // const [content, setContent] = useState('')
    const [img, setImg] = useState('')
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState([])

    const submitHandler = async (e) => {
        e.preventDefault();

        if (img === '') setImg(null)
        if (description === '') setDescription(null)

        const newSong = dispatch(submitSong({
            ownerId: user.id,
            name,
            content,
            img,
            description
        }))

        // console.log(test)

        history.push(`/songs/${newSong.id}`)
        // if (test.id) {
        // }
    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setContent(file);
    };

    return (
        <div>
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