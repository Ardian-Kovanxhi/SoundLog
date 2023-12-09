import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../../Modals/LoginFormModal';
import SignupFormModal from '../../Modals/SignupFormModal';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const pageState = useSelector(state => state.global.lightState)
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        closeMenu();
    };

    return (
        <div>
            <button
                onClick={openMenu}
                className={`profile-button-actual ${pageState ? '' : 'night'}`}
            >
                <i className="fas fa-user-circle" />
            </button>
            <div
                className={`profile-dropdown ${showMenu ? "" : "hidden"} ${pageState ? '' : 'night'}`}
                ref={ulRef}>
                {user ? (
                    <div className="dropdown-logged-in">
                        <div>{user.username}</div>
                        <div>{user.firstName} {user.lastName}</div>
                        <div>{user.email}</div>

                        {/* <button
                            onClick={() => history.push('/likes')}
                        >Likes</button>
                        <button
                            onClick={() => history.push('/playlists')}
                        >Playlists</button> */}

                        <button onClick={logout}>Log Out</button>

                    </div>
                ) : (
                    <div className="dropdown-logged-out">
                        <OpenModalMenuItem
                            itemText="Log In"
                            onItemClick={closeMenu}
                            modalComponent={<LoginFormModal />}
                        />
                        <OpenModalMenuItem
                            itemText="Sign Up"
                            onItemClick={closeMenu}
                            modalComponent={<SignupFormModal />}
                        />
                        <button
                            onClick={() => dispatch(sessionActions.login({ credential: 'demo@user.io', password: 'password' })).then(closeMenu())}
                        >
                            Demo User
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfileButton;