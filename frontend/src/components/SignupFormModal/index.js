import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const genClass = 'label-in-div sign-up '

    const [emailFocus, setEmailFocus] = useState(false)
    const [usernameFocus, setUsernameFocus] = useState(false)
    const [firstFocus, setFirstFocus] = useState(false)
    const [lastFocus, setLastFocus] = useState(false)
    const [passFocus, setPassFocus] = useState(false)
    const [cPassFocus, setCPassFocus] = useState(false)

    const eClass = genClass + (emailFocus ? 'focus' : '')
    const uClass = genClass + (usernameFocus ? 'focus' : '')
    const fClass = genClass + (firstFocus ? 'focus' : '')
    const lClass = genClass + (lastFocus ? 'focus' : '')
    const pClass = genClass + (passFocus ? 'focus' : '')
    const confirmClass = genClass + (cPassFocus ? 'focus' : '')


    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
                .then(closeModal)
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <div className="sign-up-form-container">

            <h1>Sign Up</h1>

            <form onSubmit={handleSubmit} className="sign-up-form-actual">

                <i
                    className="fa-solid fa-xmark fa-2xl"
                    onClick={() => closeModal()}
                ></i>

                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>

                <div className="error-spacer-sign-up"></div>

                <div className={eClass}>
                    <label for="email-in">
                        Email
                    </label>
                    <input
                        id="email-in"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                    />
                </div>

                <div className={uClass}>
                    <label for="username-in">
                        <div className="user-memo-div">
                            {'Username '}

                            <div className="star">
                                *
                            </div>


                            <div className="memo-div">
                                (30 Char. Max)
                            </div>

                        </div>
                    </label>
                    <input
                        id="username-in"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="30 Character Max"
                        maxLength='30'
                        required
                        onFocus={() => setUsernameFocus(true)}
                        onBlur={() => setUsernameFocus(false)}
                    />
                </div>

                <div className={fClass}>
                    <label for="first-in">
                        First Name
                    </label>
                    <input
                        id="first-in"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        onFocus={() => setFirstFocus(true)}
                        onBlur={() => setFirstFocus(false)}
                    />
                </div>

                <div className={lClass}>
                    <label for="last-in">
                        Last Name
                    </label>
                    <input
                        id="last-in"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                    />
                </div>

                <div className={pClass}>
                    <label for="pass-in">
                        Password
                    </label>
                    <input
                        id="pass-in"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        onFocus={() => setPassFocus(true)}
                        onBlur={() => setPassFocus(false)}
                    />
                </div>

                <div className={confirmClass}>
                    <label for="confp-in">
                        Confirm Password
                    </label>
                    <input
                        id="confp-in"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        onFocus={() => setCPassFocus(true)}
                        onBlur={() => setCPassFocus(false)}
                    />
                </div>

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignupFormModal;