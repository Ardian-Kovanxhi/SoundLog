import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
    const dispatch = useDispatch();
    const pageState = useSelector(state => state.global.lightState)
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const [ufocus, setUFocus] = useState(false)
    const [pfocus, setPFocus] = useState(false)

    const { closeModal } = useModal();

    const usernameClass = `label-in-div ${ufocus ? 'focus' : ''} ${pageState ? '' : 'night'}`
    const passClass = `label-in-div ${pfocus ? 'focus' : ''} ${pageState ? '' : 'night'}`

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
    };

    return (
        <div
            className="log-in-form-container"
        >
            <i
                className="fa-solid fa-xmark fa-2xl"
                onClick={() => closeModal()}
            ></i>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit} className="log-in-form-actual">
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <div className="error-spacer-div">
                    <div
                        className={usernameClass}
                    >

                        <label
                            for="username-in-log"
                        >
                            Username or Email
                        </label>

                        <input
                            id="username-in-log"
                            type="text"
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                            onFocus={() => {
                                setUFocus(true)
                            }}
                            onBlur={() => {
                                setUFocus(false)
                            }}
                            required
                        />

                    </div>

                    <div className={passClass}>

                        <label for="pass-in-log">
                            Password
                        </label>

                        <input
                            id="pass-in-log"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => {
                                setPFocus(true)
                            }}
                            onBlur={() => {
                                setPFocus(false)
                            }}
                            required
                        />

                    </div>
                </div>

                <button type="submit">Log In</button>

                <button
                    onClick={() => { dispatch(sessionActions.login({ credential: 'demo@user.io', password: 'password' })); closeModal() }}
                >
                    Demo User
                </button>
            </form>
        </div>
    );
}

export default LoginFormModal;