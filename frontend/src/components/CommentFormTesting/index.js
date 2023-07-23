import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import './test.css'
import { playSong404 } from '../../store/songs'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getPaused } from '../../store/audioPlayerState'

export default function CommentTesting() {
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(playSong404('https://aa-sounclod-clone-bucket.s3.amazonaws.com/1690097319856.mp3'))
        dispatch(getPaused(false))
    }, [])

    return (
        <>
            <div className='test404'>
                filler

                <div className='info-div-404'>
                    404 Page Not Found
                    <div
                        className='redirect'
                        onClick={() => history.push('/')}
                    >
                        🎵Return To The Jams🎵
                    </div>
                </div>

                <div className='easter-egg-div'>
                    Click for an Easter Egg
                    <i class="fa-solid fa-down-long"></i>
                </div>
            </div>
            {/* https://aa-sounclod-clone-bucket.s3.amazonaws.com/1690097319856.mp3 */}
        </>
    )
}