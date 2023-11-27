import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../Modals/LoginFormModal';
import OpenModalMenuItem from '../Modals/OpenModalButton';
import { getLight, getLoad } from "../../store/global";
import homeBarLogo from '../../images/log3.png'
import './Navigation.css';

function Navigation({ isLoaded }) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const pageState = useSelector(state => state.global.lightState)
    const history = useHistory()

    return (

        // <div className='nav-container'>
        <div className={`nav-container ${pageState ? '' : ' night'}`}>

            <div className="nav-bar-div">
                <div
                    onClick={() => {
                        history.push('/')
                    }}
                    className={`title-icon-div ${pageState ? '' : 'night'}`}
                >
                    <img src={homeBarLogo} className='log-icon-img' />
                    <div className='title-actual'>
                        SoundLog
                    </div>
                </div>
                <div className='nav-button-div'>

                    <div className='brand-btn-div'>
                        <button
                            onClick={() => dispatch(getLight(pageState ? false : true))}

                            className={`profile-button-actual ${pageState ? '' : 'night'}`}
                        >

                            {
                                pageState ?
                                    <i class="fa-solid fa-moon"></i>
                                    :
                                    <i class="fa-solid fa-sun"></i>
                            }

                        </button>
                    </div>
                    <div className='brand-btn-div'>
                        <button
                            onClick={() => window.location.replace('https://www.linkedin.com/in/ardian-kovanxhi-341177145/')}
                            // className='profile-button-actual'
                            className={`profile-button-actual ${pageState ? '' : 'night'}`}
                        >

                            <i class="fa-brands fa-linkedin"></i>

                        </button>
                    </div>

                    <div className='brand-btn-div'>
                        <button
                            onClick={() => window.location.replace('https://github.com/Ardian-Kovanxhi')}
                            // className='profile-button-actual'
                            className={`profile-button-actual ${pageState ? '' : 'night'}`}
                        >
                            <i class="fa-brands fa-github"></i>
                        </button>
                    </div>

                    <div className={`modal-but-test ${pageState ? '' : 'night'}`}>
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