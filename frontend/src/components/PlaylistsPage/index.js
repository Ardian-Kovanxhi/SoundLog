import { useSelector } from "react-redux"
import './playlists.css'

export default function Playlists() {

    const User = useSelector(state => state.session.user)


    return (
        <div className="playlists-base">
            {
                User ?
                    <p>User logged</p>
                    :
                    <p>No User</p>
            }
        </div>
    )
}