import { useDispatch, useSelector } from "react-redux"
import { getPlaylists } from "../../../store/playlists"
import { useCallback, useEffect } from "react";

export default function AllPlaylists() {
    const dispatch = useDispatch();

    const Playlists = useSelector(state => state.playlists.allPlaylists);


    const fetchData = useCallback(async () => {
        dispatch(getPlaylists());
    }, [dispatch])

    useEffect(() => {
        fetchData()
    }, [fetchData])


    return (
        <div className="all-songs-div-container">
            {Object.values(Playlists).map((playlist, index) => (
                <div key={`playlist${index}`}>
                    <img src={playlist.coverImg} />
                    {playlist.name}
                </div>
            ))}
        </div>
    )
}