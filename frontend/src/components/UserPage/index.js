import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoad } from "../../store/global";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getUser } from "../../store/session";
import './UserPage.css'

export default function UserPage() {
    const dispatch = useDispatch();

    const { userId } = useParams();

    const User = useSelector(state => state.session.viewedUser);

    async function fetchData() {
        await dispatch(getUser(Number(userId) + 1))
    }

    useEffect(() => {
        // dispatch(getUser(userId))
        fetchData()
        dispatch(getLoad(false))
    }, [])

    return (
        <div style={{ zIndex: 1 }}>
            {User ? `USER PAGE ${User.username}` : ''}
        </div>
    )
}