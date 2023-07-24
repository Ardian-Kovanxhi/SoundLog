import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import './test.css'
import { playSong404 } from '../../store/songs'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getPaused } from '../../store/audioPlayerState'

export default function CommentTesting() {
    const dispatch = useDispatch()
    const history = useHistory()

    return (
        <>
            <div className='test404'>
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
                    className='easter-btn'
                    onClick={() => dispatch(playSong404('https://aa-sounclod-clone-bucket.s3.amazonaws.com/1690097319856.mp3'))}
                >
                    Click for an Easter Egg
                </button>

                filler2
            </div>
            {/* https://aa-sounclod-clone-bucket.s3.amazonaws.com/1690097319856.mp3 */}
        </>
    )
}