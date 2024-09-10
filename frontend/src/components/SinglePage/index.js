import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getCommentsBySong } from "../../store/comments";
import { getSong } from '../../store/songs';
import { getSinglePlaylist } from '../../store/playlists';
import { getAllSongLikes } from '../../store/likes';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { usePage } from '../../context/Page';
import BtnMenu from './DropdownMenus/edit-deleteMenu';
import SongComments from './SongComments'
import ProgressBar from '../Global/AudioUtils/progress-bar';
import LikeButton from './LikeButton';
import placeholderImg from '../../images/placeholder.png'
import GenClass from '../StoreFunctionClasses/GenClass';
import PlayPauseBtn from '../Global/AudioUtils/play-pause-btn';
import './SingleSong.scss'
import PlaylistSongs from './PlaylistSongs';

/*
copied and refactored progress bar from single songs.
also made play/pause reusable
need to make the base code universal for the css
profit
*/

export default function SinglePage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { songId, playlistId } = useParams();
    // const [pageState, setPageState] = useState(!playlistId);
    const { lightMode, setLoadState } = usePage();

    const pageState = !playlistId;
    const SingleFocus = useSelector(state => state[pageState ? "songs" : "playlists"][pageState ? "singleSong" : "singlePlaylist"]);
    const User = useSelector(state => state.session.user);


    const fetchSongData = useCallback(async () => {
        setLoadState(true);
        try {
            await dispatch(getSong(songId))
        } catch {
            history.push('/404')
            setLoadState(false);
            return
        }
        await dispatch(getCommentsBySong(songId));
        await dispatch(getAllSongLikes(songId));
        setLoadState(false);
    }, [dispatch, history, setLoadState, songId])

    const fetchPlaylistData = useCallback(async () => {
        await dispatch(getSinglePlaylist(playlistId))
        setLoadState(false);
    }, [dispatch, playlistId, setLoadState])

    useEffect(() => {
        if (pageState) fetchSongData();
        else fetchPlaylistData();
    }, [pageState, fetchSongData, fetchPlaylistData]);

    return (
        <div className='single-song-container-div'>

            <div className='single-song-div'>
                <div
                    className='blur-box'
                >

                    <div className={`filler-color-2${lightMode ? '' : ' night'}`}></div>

                    <img
                        className='blur-img'
                        src={SingleFocus.coverImg || placeholderImg}
                        alt='Blurred Background'
                    />

                </div>

                <div className='single-song-info-img-div'>

                    <div className='single-song-info-div'>

                        <div className='info-buttons-div'>

                            <div>
                                <div className='pfp-info-div'>

                                    {pageState ?
                                        <PlayPauseBtn songId={SingleFocus.id} classTag={"single-univ-button"} big={true} />
                                        :
                                        null
                                    }

                                    <div className='song-name-uploader-div'>

                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                            }}
                                        >
                                            <div className={`song-name-div${lightMode ? '' : ' night'}`}>
                                                {pageState ? SingleFocus.name : SingleFocus.name}
                                            </div>

                                            {pageState ?
                                                <LikeButton songId={songId} pageRendered={true} />
                                                :
                                                null
                                            }

                                            {/* 
                                            DROPDOWN MENU
                                            {
                                                User ?
                                                    Song.userId === User.id || User.id === 1
                                                        ?
                                                        <div className='edit-delete-buttons-div'>
                                                            <BtnMenu />
                                                        </div>
                                                        :
                                                        null : null
                                            } 
                                             */}

                                        </div>

                                        <div
                                            className={`song-uploader-div${lightMode ? '' : ' night'}`}
                                        // onClick={() => GenClass.userRedirect(Number(Song.User.id), history)}
                                        >
                                            {pageState ?
                                                SingleFocus.User ? SingleFocus.User.username : ""
                                                :
                                                SingleFocus.User ? SingleFocus.User.username : ""
                                            }
                                        </div>

                                    </div>
                                </div>
                            </div>


                        </div>

                        {pageState ?
                            <div
                                className={`single-song-desc ${!!SingleFocus.description ? '' : 'false'} ${lightMode ? '' : 'night'}`}
                            >
                                {SingleFocus.description}
                            </div>
                            :
                            null}

                        {pageState ?
                            <ProgressBar Song={SingleFocus} />
                            :
                            null}


                        {
                            User ?
                                User.id === 1 ?
                                    <div>{pageState ? SingleFocus.content : ""}</div> :
                                    null : null
                        }


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
                            src={SingleFocus.coverImg || placeholderImg}
                            alt='Album Cover' />

                    </div>


                </div>

            </div>

            {pageState ?
                <SongComments />
                :
                <PlaylistSongs PlaylistSongs={SingleFocus.PlaylistSongs} />
            }

        </div>
    )
}