import { useSelector } from "react-redux"
import './likes.css'

export default function Likes() {

    const User = useSelector(state => state.session.user)


    return (
        <div className="likes-base">
            {
                User ?
                    <p>User logged</p>
                    :
                    <p>No User</p>
            }
        </div>
    )
}