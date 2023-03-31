import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
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
                <div>
                    <div>
                        <button
                            onClick={() => history.push('/songs')}
                        >
                            New Song
                        </button>
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