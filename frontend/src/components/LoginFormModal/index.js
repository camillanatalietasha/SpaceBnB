import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [disableButton, setDisableButton] = useState(true);
  const { closeModal } = useModal();

  useEffect(() => {
    if(credential.length >= 4 && password.length >= 6) setDisableButton(false)
    else setDisableButton(true)
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.thunkLoginUser({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  const demoUser = () => {
    return dispatch(sessionActions.thunkLoginUser( {credential: "Demo-lition", password: "pass1234"}))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  }

  return (
    <>
      <h1>Log In</h1>
      <form className="session-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label className="session-label">
          Username or Email
          <input
          className="session-input"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label className="session-label">
          Password
          <input
            className="session-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button 
        className="standard-button" 
        type="submit"
        disabled={disableButton}
        >
          Log In
        </button>
        <button 
        className="standard-button"
        type="button"
        onClick={demoUser}
        >
          Login as Demo User
        </button>
      </form>
    </>
  );
}

export default LoginFormModal;
