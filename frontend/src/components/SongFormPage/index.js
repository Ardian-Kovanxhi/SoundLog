import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './SongFormPage.css'

export default function SongFormPage() {
    const dispatch = useDispatch();

    const User = useSelector(state => state.session.user);

    const [name, setName] = useState('')
    const [content, setContent] = useState('')
    const [img, setImg] = useState()
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState([])

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
                        {'Song: '}
                    </label>
                    <input
                        type='text'
                        onChange={(e) => setContent(e.target.value)}
                        value={content}
                        required
                    />
                </div>
                <div>
                    <label>
                        {'Image: '}
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
                        required
                    />
                </div>
                <button>Submit</button>
            </form>
        </div>
    )

}