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
        <div>
            {songArr.map(el => (
                <div
                    onClick={() => history.push(`/songs/${el.id}`)}
                >
                    {el.name}
                </div>
            ))}
        </div>
    )
}