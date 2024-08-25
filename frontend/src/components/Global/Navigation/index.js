import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../../Modals/LoginFormModal';
import OpenModalMenuItem from '../../Modals/OpenModalButton';
import homeBarLogo from '../../../images/log3.png'
import { usePage } from '../../../context/Page';
import Cookies from "js-cookie";
import './Navigation.scss';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory()

    const { setLightMode, lightMode } = usePage();

    const lightHandler = () => {
        setLightMode(lightMode ? false : true);
        Cookies.set('pageTheme', lightMode ? "night" : "day", { expires: 604800 })
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
                <div className='nav-button-div'>

                    <div className='brand-btn-div'>
                        <button
                            // onClick={() => setLightMode(lightMode ? false : true)}
                            onClick={lightHandler}

                            className={`profile-button-actual ${lightMode ? '' : 'night'}`}
                        >

                            {
                                lightMode ?
                                    <i className="fa-solid fa-moon"></i>
                                    :
                                    <i className="fa-solid fa-sun"></i>
                            }

                        </button>
                    </div>
                    <div className='brand-btn-div'>
                        <button
                            onClick={() => window.location.replace('https://www.linkedin.com/in/ardian-kovanxhi/')}
                            // className='profile-button-actual'
                            className={`profile-button-actual ${lightMode ? '' : 'night'}`}
                        >

                            <i className="fa-brands fa-linkedin"></i>

                        </button>
                    </div>

                    <div className='brand-btn-div'>
                        <button
                            onClick={() => window.location.replace('https://github.com/Ardian-Kovanxhi')}
                            // className='profile-button-actual'
                            className={`profile-button-actual ${lightMode ? '' : 'night'}`}
                        >
                            <i className="fa-brands fa-github"></i>
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
