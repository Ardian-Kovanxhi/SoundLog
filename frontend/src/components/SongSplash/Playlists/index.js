import { useDispatch, useSelector } from "react-redux"
import { getPlaylists, getSinglePlaylist } from "../../../store/playlists"
import { useCallback, useEffect, useState } from "react";
import img404 from "../../../images/song-placeholder.png"
import { usePage } from "../../../context/Page";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function AllPlaylists() {
    const dispatch = useDispatch();
    const history = useHistory();

    const Playlists = useSelector(state => state.playlists.allPlaylists);

    const { lightMode, setLoadState } = usePage();

    const [hoveredIndex, setHoveredIndex] = useState(null);

    const fetchData = useCallback(async () => {
        await dispatch(getPlaylists());
    }, [dispatch])

    const singleLoad = async (playlistId) => {
        await dispatch(getSinglePlaylist(playlistId))
        setLoadState(false)
    }

    useEffect(() => {
        fetchData()
    }, [fetchData])


    return (
        <div className="all-songs-div-container">
            {Object.values(Playlists).map((playlist, index) => (
                <div
                    className={`all-songs-single ${lightMode ? '' : ' night'}`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    key={index}
                    onClick={() => { singleLoad(playlist.id).then(history.push(`/playlists/${playlist.id}`)) }}
                >
                    <div className={`like-btn-render${hoveredIndex === index ? ' hovered' : ''}`}>
                    </div>

                    <div
                        style={{
                            width: '200px',
                            height: '237px',
                            padding: '17px'

                        }}
                    >
                        <div className='all-songs-img-div'>

                            <img
                                className='all-songs-single-img'
                                src={playlist.coverImg || img404}
                                alt='Album Cover'
                            />
                            <div className={`gradient-div${hoveredIndex === index ? ' hovered' : ''}`}></div>

                        </div>

                        <div className={`all-songs-song-name ${lightMode ? '' : ' night'}`}>
                            {playlist.name}
                        </div>

                    </div>

                    <div
                        className={`all-songs-username ${lightMode ? '' : ' night'}`}
                    >
                        {playlist.User.username}
                    </div>

                </div>
            )

                // return (
                //     <div key={`playlist${index}`}>
                //         <img
                //             style={{ width: "300px", height: "300px" }}
                //             src={playlist.coverImg || img404}
                //             alt="playlist img" />
                //         {playlist.name}
                //     </div>
                // )
            )}
        </div>
    )
}