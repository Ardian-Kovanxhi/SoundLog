import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { getCommentsBySong } from "../../store/comments";
import { getSongs, getSong, playSong } from '../../store/songs';

export default function SelectedSong() {
    const dispatch = useDispatch();
    const Songs = useSelector(state => state.songs.allSongs);
    // const Song = useSelector(state => state.songs.singleSong);
    const history = useHistory()
    // const User = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getSongs())
    }, [])

    const songArr = Object.values(Songs)

    return (
        <div className='all-songs-div-container'>
            <div className='all-songs-div'>
                {songArr.map(el => (
                    <>
                        <div
                            className='all-songs-single'
                            onClick={() => history.push(`/songs/${el.id}`)}
                        >
                            <img
                                className='all-songs-single-img'
                                src={el.img ||
                                    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'} />
                            <div className='all-songs-song-name'>
                                {el.name}
                            </div>
                            <div className='all-songs-username'>
                                {el.User.username}
                            </div>
                        </div>
                        <button onClick={() => dispatch(playSong(el.id))}>play</button>
                    </>
                ))}
            </div>
        </div>
    )
}
