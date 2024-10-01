import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../../Modals/LoginFormModal';
import OpenModalMenuItem from '../../Modals/OpenModalButton';
import homeBarLogo from '../../../images/log3.png'
import { usePage } from '../../../context/Page';
import { getSearch } from '../../../store/search';
import Cookies from "js-cookie";
import './Navigation.scss';

function Navigation({ isLoaded }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory()

    const { setLightMode, lightMode, splashDisplay, setSplashDisplay } = usePage();

    const lightHandler = () => {
        setLightMode(!lightMode);
        Cookies.set('pageTheme', lightMode ? "night" : "day", { expires: 604800 })
    }

    const splashHandler = () => {
        setSplashDisplay(!splashDisplay)
        Cookies.set("splashState", splashDisplay ? "playlists" : "songs", { expires: 604800 })
    }

    const searchHandler = async () => {
        await dispatch(getSearch(["pink", "floyd"], ""))
        history.push(`/search?q=pink+floyd`)
    }

    return (

        // <div className='nav-container'>
        <div className={`nav-container ${lightMode ? '' : ' night'}`}>

            <div className="nav-bar-div">
                <div
                    onClick={() => {
                        history.push('/')
                    }}
                    className={`title-icon-div ${lightMode ? '' : 'night'}`}
                >
                    <img
                        src={homeBarLogo}
                        className='log-icon-img'
                        alt=''
                    />
                    <div className='title-actual'>
                        SoundLog
                    </div>
                </div>

                {/* <button onClick={searchHandler}>
                    SEARCH
                </button> */}

                <div className='nav-button-div'>

                    {/* <div className='brand-btn-div'>
                        <button
                            className={`profile-button-actual ${lightMode ? "" : "night"}`}
                            onClick={splashHandler}
                        >
                            {splashDisplay ?
                                <i className="fa-solid fa-music fa-global-class"></i>
                                :
                                <i className="fa-solid fa-list fa-global-class"></i>
                            }
                        </button>
                    </div> */}
                    {/* <div className='brand-btn-div'>
                        <button className={`profile-button-actual ${lightMode ? "" : "night"}`}>
                            <i className="fa-solid fa-filter fa-global-class"></i>
                        </button>
                    </div>
                    <div className='brand-btn-div'>
                        <button className={`profile-button-actual ${lightMode ? "" : "night"}`}>
                            <i className="fa-solid fa-magnifying-glass fa-global-class"></i>
                        </button>
                    </div> */}

                    <div className='brand-btn-div'>
                        <button
                            // onClick={() => setLightMode(lightMode ? false : true)}
                            onClick={lightHandler}

                            className={`profile-button-actual ${lightMode ? '' : 'night'}`}
                        >
                            {
                                lightMode ?
                                    <i className="fa-solid fa-moon fa-global-class"></i>
                                    :
                                    <i className="fa-solid fa-sun fa-global-class"></i>
                            }

                        </button>
                    </div>
                    <div className='brand-btn-div'>
                        <button
                            onClick={() => window.location.replace('https://www.linkedin.com/in/ardian-kovanxhi/')}
                            // className='profile-button-actual'
                            className={`profile-button-actual ${lightMode ? '' : 'night'}`}
                        >

                            <i className="fa-brands fa-linkedin fa-global-class"></i>

                        </button>
                    </div>

                    <div className='brand-btn-div'>
                        <button
                            onClick={() => window.location.replace('https://github.com/Ardian-Kovanxhi')}
                            // className='profile-button-actual'
                            className={`profile-button-actual ${lightMode ? '' : 'night'}`}
                        >
                            <i className="fa-brands fa-github fa-global-class"></i>
                        </button>
                    </div>

                    <div className={`modal-but-test ${lightMode ? '' : 'night'}`}>
                        {/* <button
                            onClick={() => history.push('/songs')}
                        >
                            New Song
                        </button> */}
                        {
                            sessionUser ?
                                <button
                                    onClick={() => history.push('/songs')}
                                >
                                    New Song
                                </button>
                                :
                                <OpenModalMenuItem
                                    itemText="New Song"
                                    buttonText='New Song'
                                    modalComponent={<LoginFormModal />}
                                />

                        }
                    </div>
                    {isLoaded && (
                        <div>
                            <ProfileButton user={sessionUser} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navigation;
