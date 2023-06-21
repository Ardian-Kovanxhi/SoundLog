import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
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

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <div>
            <button onClick={openMenu} className="profile-button-actual">
                <i className="fas fa-user-circle" />
            </button>
            <div className={ulClassName} ref={ulRef}>
                {user ? (
                    <div className="dropdown-logged-in">
                        <div>{user.username}</div>
                        <div>{user.firstName} {user.lastName}</div>
                        <div>{user.email}</div>

                        <button>Likes</button>
                        <button>Playlists</button>

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
                            onClick={() => dispatch(sessionActions.login({ credential: 'demo@user.io', password: 'password' }))}
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