import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getCommentsBySong } from "../../store/comments";
import { getSongs } from '../../store/songs';

export default function SelectedSong() {
    const dispatch = useDispatch();
    // const {songId} = useParams();
    const songId = 1
    // const Song = useSelector(state => state.songs.singleSong);
    const Songs = useSelector(state => state.songs.allSongs);
    const Comments = useSelector(state => state.comments.allComments);
    // const User = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getSongs())
        dispatch(getCommentsBySong(songId))
    }, [])

    const songArr = Object.values(Songs)
    const commentArr = Object.values(Comments)

    return (
        <div>
            {commentArr.map(el => (
                <li>
                    {el.comment}
                </li>
            ))}
            break
            {songArr.map(el => (
                <li>
                    {el.name}
                </li>
            ))}
        </div>
    )
}