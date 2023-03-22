import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory()

    return (
        <ul>
            <li>
                <NavLink exact to="/">Home</NavLink>
            </li>
            <li>
                <button
                    onClick={() => history.push('/songs')}
                >
                    New Song
                </button>
            </li>
            {isLoaded && (
                <li>
                    <ProfileButton user={sessionUser} />
                </li>
            )}
        </ul>
    );
}

export default Navigation;