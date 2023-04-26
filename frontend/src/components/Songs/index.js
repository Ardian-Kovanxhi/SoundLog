import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { getCommentsBySong } from "../../store/comments";
import { getSongs } from '../../store/songs';

export default function SelectedSong() {
    const dispatch = useDispatch();
    const Songs = useSelector(state => state.songs.allSongs);
    const history = useHistory()
    // const User = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getSongs())
    }, [])

    const songArr = Object.values(Songs)

    return (
        <div className='all-songs-div-container'>
            {/* <iframe width="2504" height="1122" src="https://www.youtube.com/embed/MVPTGNGiI-4" title="synthwave radio 🌌 - beats to chill/game to" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
            <div className='all-songs-div'>
                {songArr.map(el => (
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
                ))}
            </div>
        </div>
    )
}
