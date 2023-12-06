import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoad } from "../../store/global";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

export default function UserPage() {
    const dispatch = useDispatch();

    const { userId } = useParams();

    // const User = useSelector()

    useEffect(() => {
        dispatch(getLoad(false))
    }, [])

    return (
        <div style={{ zIndex: 1 }}>
            USER PAGE
            {userId}
        </div>
    )
}