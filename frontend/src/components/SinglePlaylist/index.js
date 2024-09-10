import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { getSinglePlaylist } from "../../store/playlists";
import { usePage } from "../../context/Page";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import GenClass from "../StoreFunctionClasses/GenClass";
import placeholderImg from "../../images/song-placeholder.png"
import "./singlePlaylist.scss"

export default function SinglePlaylist() {
    const dispatch = useDispatch();
    const history = useHistory();

    const { lightMode, setLoadState } = usePage();
    const { playlistId } = useParams();
    const playlist = useSelector(state => state.playlists.singlePlaylist);


    const fetchData = useCallback(async () => {
        await dispatch(getSinglePlaylist(playlistId))
        setLoadState(false);
    }, [dispatch, playlistId, setLoadState])

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className='single-song-container-div'>

            <div className='single-song-div'>
                <div
                    className='blur-box'
                >

                    <div className={`filler-color-2${lightMode ? '' : ' night'}`}></div>

                    <img
                        className='blur-img'
                        src={playlist.coverImg || placeholderImg}
                        alt='Blurred Background'
                    />

                </div>

                <div className='single-song-info-img-div'>

                    <div className='single-song-info-div'>

                        <div className='info-buttons-div'>

                            <div>
                                <div className='pfp-info-div'>

                                    <div className='song-name-uploader-div'>

                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                            }}
                                        >
                                            <div className={`song-name-div${lightMode ? '' : ' night'}`}>
                                                {playlist.name}
                                            </div>
                                        </div>

                                        <div
                                            className={`song-uploader-div${lightMode ? '' : ' night'}`}
                                            onClick={() => GenClass.userRedirect(Number(playlist.User.id), history)}
                                        >
                                            {playlist.User.username}
                                        </div>

                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>


                    <div
                        style={{
                            zIndex: '2',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >

                        <img
                            className='single-song-img'
                            src={
                                playlist.coverImg
                                ||
                                'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'
                            }
                            alt='Album Cover' />
                    </div>
                </div>
            </div>
        </div>
    )
}