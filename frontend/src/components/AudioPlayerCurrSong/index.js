import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import './CurrSong.css'

export default function CurrSongDisplay() {

    const song = useSelector(state => state.songs.playingSong)
    const [boxVis, setBoxVis] = useState(false)

    useEffect(() => {
        if (song.content) {
            setBoxVis(true)
        }
    }, [song])

    const containerClass = 'player-img-name-container' + (boxVis ? '' : ' invisible')

    return (
        <>
            {
                song.content ?
                    <div className={containerClass}>

                        <div className='place-container'>


                            <img
                                className='player-img-actual'
                                src={
                                    song.img
                                    ||
                                    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'

                                } />

                            <div className='name-test'>
                                <div
                                    style={{
                                        height: '20px',
                                        overflow: 'hidden'
                                    }}
                                >
                                    {song.name}
                                </div>

                            </div>

                        </div>
                    </div>
                    :
                    ''
            }
        </>
        // {
        //     song.img ?
        //         <>
        //             <div>
        //                 {song ? song.name : ''}
        //             </div>
        //         </>
        //         :
        //         ''
        // }
    )

}