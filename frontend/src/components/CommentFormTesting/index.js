import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { playSong404 } from '../../store/songs'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import './test.css'

export default function CommentTesting() {
    const dispatch = useDispatch()
    const history = useHistory()

    const [easter, setEaster] = useState(false)

    const gifClass = 'test404 ' + (easter ? 'gif' : '')
    const btnClass = 'easter-btn ' + (easter ? 'gif' : '')

    return (
        <>
            <div className={gifClass}>
                filler

                <div className='info-div-404'>

                    <div>
                        ERROR 404
                    </div>

                    Page Not Found

                    <div
                        className='redirect'
                        onClick={() => history.push('/')}
                    >
                        🎵Return To The Jams🎵
                    </div>
                </div>


                <button
                    className={btnClass}
                    onClick={() => {
                        dispatch(playSong404('https://aa-sounclod-clone-bucket.s3.amazonaws.com/1690097319856.mp3'))
                        setEaster(true)
                    }}
                >
                    Click for an Easter Egg
                </button>

                filler2
            </div>
            {/* https://aa-sounclod-clone-bucket.s3.amazonaws.com/1690097319856.mp3 */}
        </>
    )
}