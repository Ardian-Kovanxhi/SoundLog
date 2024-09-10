import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getCommentsBySong } from "../../store/comments";
import { getSong } from '../../store/songs';
import { getAllSongLikes } from '../../store/likes';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { usePage } from '../../context/Page';
import BtnMenu from './DropdownMenus/edit-deleteMenu';
import SongComments from './SongComments'
import ProgressBar from '../Global/AudioUtils/progress-bar';
import LikeButton from './LikeButton';
import placeholderImg from '../../images/song-placeholder.png'
import GenClass from '../StoreFunctionClasses/GenClass';
import PlayPauseBtn from '../Global/AudioUtils/play-pause-btn';
import './SingleSong.scss'

/*
copied and refactored progress bar from single songs.
also made play/pause reusable
need to make the base code universal for the css
profit
*/

export default function SingleSong() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { songId } = useParams();


    const Song = useSelector(state => state.songs.singleSong);
    const User = useSelector(state => state.session.user);
    let Uploader = '';

    const { lightMode, setLoadState } = usePage();

    async function fetchData() {
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
    }

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='single-song-container-div'>

            <div className='single-song-div'>
                <div
                    className='blur-box'
                >

                    <div className={`filler-color-2${lightMode ? '' : ' night'}`}></div>

                    <img
                        className='blur-img'
                        src={Song.img || placeholderImg}
                        alt='Blurred Background'
                    />

                </div>

                <div className='single-song-info-img-div'>

                    <div className='single-song-info-div'>

                        <div className='info-buttons-div'>

                            <div>
                                <div className='pfp-info-div'>

                                    <PlayPauseBtn songId={Song.id} classTag={"single-univ-button"} big={true} />

                                    <div className='song-name-uploader-div'>

                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                            }}
                                        >
                                            <div className={`song-name-div${lightMode ? '' : ' night'}`}>
                                                {Song.name}
                                            </div>

                                            <LikeButton songId={songId} pageRendered={true} />

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

                                        </div>

                                        <div
                                            className={`song-uploader-div${lightMode ? '' : ' night'}`}
                                            onClick={() => GenClass.userRedirect(Number(Song.User.id), history)}
                                        >
                                            {Uploader}
                                        </div>

                                    </div>
                                </div>
                            </div>


                        </div>

                        <div
                            className={`single-song-desc ${!!Song.description ? '' : 'false'} ${lightMode ? '' : 'night'}`}
                        >
                            {Song.description}
                        </div>

                        <ProgressBar Song={Song} />

                        {
                            User ?
                                User.id === 1 ?
                                    <div>{Song.content}</div> :
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
                            src={
                                Song.img
                                ||
                                'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'
                            }
                            alt='Album Cover' />

                    </div>


                </div>

            </div>

            <SongComments />

        </div>
    )
}