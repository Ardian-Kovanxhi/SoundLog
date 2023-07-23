import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import OpenModalMenuItem from '../OpenModalButton';
import * as sessionActions from '../../store/session';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory()

    return (

        <div className='nav-container'>

            <div className="nav-bar-div">
                <div
                    onClick={() => history.push('/')}
                    className='title-icon-div'
                >
                    <img src='https://img.freepik.com/free-icon/log_318-541649.jpg' className='log-icon-img' />
                    <div className='title-actual'>
                        SoundLog
                    </div>
                </div>
                <div className='nav-button-div'>

                    <div className='brand-btn-div'>
                        <button
                            onClick={() => window.location.replace('https://www.linkedin.com/in/ardian-kovanxhi-341177145/')}
                            className='profile-button-actual'
                        >

                            <i class="fa-brands fa-linkedin"></i>

                        </button>
                    </div>

                    <div className='brand-btn-div'>
                        <button
                            onClick={() => window.location.replace('https://github.com/Ardian-Kovanxhi')}
                            className='profile-button-actual'
                        >
                            <i class="fa-brands fa-github"></i>
                        </button>
                    </div>

                    <div className='modal-but-test'>
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