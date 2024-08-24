import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { playSong404 } from '../../store/songs'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getLoad } from '../../store/global';
import './Error.scss'
import { usePage } from '../../context/Page/Page';

export default function ErrorPage() {
    const dispatch = useDispatch()
    const history = useHistory()

    const [easter, setEaster] = useState(false)

    const gifClass = `test404${easter ? ' gif' : ''}`
    const btnClass = `easter-btn${easter ? ' gif' : ''}`

    async function timedDeRender() {
    }

    const { lightMode } = usePage();

    useEffect(() => {
        dispatch(getLoad(false))
    }, [])

    return (
        <>
            <div className={gifClass}>
                filler

                <div className={`info-div-404${lightMode ? '' : ' night'}`}>

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
                        dispatch(playSong404());
                        setEaster(true);
                    }}
                >
                    Click for an Easter Egg
                </button>

                <div style={{ visibility: 'hidden' }}>
                    filler2
                </div>
            </div>
        </>
    )
}