import { useDispatch } from "react-redux"
import { removeSong } from "../../store/songs"
import { useParams, useHistory } from 'react-router-dom'
import OpenModalMenuItem from '../OpenModalButton';
import SongEditPage from "../SongEditPage";

export default function BtnMenu() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { songId } = useParams();


    const deleteHandler = async () => {
        const rem = await dispatch(removeSong(songId))
        if (rem.ok) {
            history.push('/')
        }
    }

    return (
        <div className='edit-delete-buttons-div'>
            <OpenModalMenuItem
                // itemText="Test"
                buttonText='Edit'
                modalComponent={<SongEditPage />}
            />

            <button
                onClick={deleteHandler}
            >Delete</button>

        </div>
    )

}