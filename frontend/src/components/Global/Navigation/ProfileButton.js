import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import * as sessionActions from '../../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../../Modals/LoginFormModal';
import SignupFormModal from '../../Modals/SignupFormModal';
import GenClass from "../../StoreFunctionClasses/GenClass";
import { usePage } from "../../../context/Page";

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const { lightMode } = usePage();

    const closeMenu = e => {
        if (ulRef.current && !ulRef.current.contains(e.target)) {
            setShowMenu(false)
        }
    }

    useEffect(() => {

        if (showMenu) {
            document.addEventListener("mousedown", closeMenu);
        } else {
            document.removeEventListener("mousedown", closeMenu);
        }

        return () => document.removeEventListener("mousedown", closeMenu);

    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <div>
            <button
                onClick={() => setShowMenu(true)}
                className={`profile-button-actual ${lightMode ? '' : 'night'}`}
            >
                <i className="fas fa-user-circle" />
            </button>
            <div
                className={`profile-dropdown ${showMenu ? "" : "hidden"} ${lightMode ? '' : 'night'}`}
                ref={ulRef}>
                {user ? (
                    <div className="dropdown-logged-in" onClick={() => setShowMenu(false)}>
                        <button onClick={() => GenClass.userRedirect(Number(user.id), history)}>View Profile</button>
                        <button onClick={logout}>Log Out</button>

                    </div>
                ) : (
                    <div className="dropdown-logged-out" onClick={() => setShowMenu(false)}>
                        <OpenModalMenuItem
                            itemText="Log In"
                            modalComponent={<LoginFormModal />}
                        />
                        <OpenModalMenuItem
                            itemText="Sign Up"
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