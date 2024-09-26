import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationBg from "../../assets/img/authentication-bg.png";
import "../../assets/scss/authentication.scss";
import "./Register.scss";
import Cookies from "js-cookie";
import axios from "axios";
import {
  hasDigit,
  hasLowercase,
  hasSymbol,
  hasUppercase,
  showError,
  showSuccess,
} from "../../assets/js/validator.js";
import { reactLocalStorage } from "reactjs-localstorage";

import { UserContext } from "../../contexts/user.context.jsx";

// reactLocalStorage.set('var', true);
// reactLocalStorage.get('var', true);
// reactLocalStorage.setObject('var', {'test': 'test'});
// reactLocalStorage.getObject('var');
export default function Register({ setShowLoginForm, setShowRegisterForm }) {
  const { user, login } = useContext(UserContext);

  const [inputs, setInputs] = useState({});
  const usernameErrRef = useRef();
  const passwordErrRef = useRef();
  const confirmPasswordErrRef = useRef();
  const fullnameErrRef = useRef();
  const internalErrRef = useRef();
  const navigate = useNavigate();

  function validateInputs() {
    const usernameVal = inputs.username;
    const passwordVal = inputs.password;
    const confirmPasswordVal = inputs.confirm_password;
    const fullnameVal = inputs.fullname;
    let isValidUsername = false;
    let isValidPassword = false;
    let isValidConfirmPassword = false;
    let isValidFullname = false;

    if (!usernameVal) {
      showError(usernameErrRef, "Username is required");
    } else if (usernameVal.length < 5) {
      showError(
        usernameErrRef,
        "Length of username should be greater than 5 and less than 50"
      );
    } else {
      isValidUsername = true;
      showSuccess(usernameErrRef);
    }

    if (!passwordVal) {
      showError(passwordErrRef, "Password is required");
    } else if (passwordVal.length < 6) {
      showError(
        passwordErrRef,
        "Length of password should be greater than 5 characters"
      );
    } else if (!hasSymbol(passwordVal)) {
      showError(
        passwordErrRef,
        "Password should has at least one special character"
      );
    } else if (!hasDigit(passwordVal)) {
      showError(
        passwordErrRef,
        "Length of password should has at least one digit"
      );
    } else {
      isValidPassword = true;
      showSuccess(passwordErrRef);
    }

    if (!confirmPasswordVal) {
      showError(confirmPasswordErrRef, "Confirm password is required");
    } else if (confirmPasswordVal != passwordVal) {
      showError(confirmPasswordErrRef, "Password does not match");
    } else {
      isValidConfirmPassword = true;
      showSuccess(confirmPasswordErrRef);
    }

    if (!fullnameVal) {
      showError(fullnameErrRef, "Full name is required");
    } else if (hasSymbol(fullnameVal) || hasDigit(fullnameVal)) {
      showError(fullnameErrRef, "Invalid full name");
    } else {
      isValidFullname = true;
      showSuccess(fullnameErrRef);
    }

    console.log(
      isValidUsername,
      isValidPassword,
      isValidConfirmPassword,
      isValidFullname
    );

    return (
      isValidUsername &&
      isValidPassword &&
      isValidConfirmPassword &&
      isValidFullname
    );
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    inputs.role = "talent";
    const { confirm_password, ...others } = inputs;
    console.log(others);

    // FE validation
    let isValidRegistrationInfo = validateInputs();
    if (isValidRegistrationInfo) {
      try {
        const response = await axios.post(
          "http://localhost:3000/users/register",
          others
        );
        console.log(response.data);
        console.log(response);
        console.log("User data before Login: " + JSON.parse(user));
        if (response.status == 200) {
          alert("Register successfully");
          const user = response.data;
          login(user);
          console.log("User data after Login: " + JSON.parse(user));
          // setUser(response.data);
          // Call login route
        } else if (response.status == 400) {
          alert("Username already exists!");
          // Show error for the field "username"
        }
      } catch (error) {
        if (error.response.status == 400) {
          usernameErrRef.current.innerHTML = error.response.data.error;
        } else {
          internalErrRef.current.innerHTML =
            "Internal Error: " + error.response.data.error;
        }
      }
    }
  };

  return (
    <div className="overlay">
      <div className="authentication register">
        <div className="authentication-left">
          <img src={AuthenticationBg} alt="Background image of registration" />
          <h2>Say Hello</h2>
          <hr />
          <h4>Make art, make a difference</h4>
          <p>
            Every sale on ArtMart will contribute to the charity fund to help
            homeless children, people with disabilities, and plant more trees
          </p>
          <span>by Elena Jullia</span>
        </div>
        <div className="authentication-right">
          <form className="form register-form" onSubmit={handleSubmit}>
            <img
              className="form-close-ic"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAARNJREFUSEvt1DtKBEEURuFvUkFMlFEwEBF0DYMPUFNxG2IquBOZxEhwA+IKVIxUTH1grKGuQC6U0EhPVTnQmEyFTdV/7j11u3o6Xr2O800ARcP/rugYZ3gfUeoqNnA6qpVcB4c4wQs2WyAruMY89nHRBskB4mAERNBrqvSnk2Xcoo9HbOHrr4DY3waZqg2PgJpLXsBV6uQJMwl8jx185kapBhDnF5OupRSW1dIE1gLCdTgP97EesF2qvlZRhN8kRc9JUXy7w24JUuqgWfkbBphujGexkxygLfwjKYrRDWVzJV05wAGGCC0x57//5rXUySz2cDnOf3CE88xTEZD1cZ+K4ktZs6F0yTUZ2T0TQFFh54q+ARi0NBkujYiHAAAAAElFTkSuQmCC"
              onClick={() => {
                setShowRegisterForm(false);
              }}
            />
            <h2 className="form-title">Sign Up</h2>
            <div className="form-field">
              <label htmlFor="username" className="form-field__label">
                Username
              </label>
              <input
                type="text"
                className="form-field__input"
                id="username"
                name="username"
                value={inputs.username || ""}
                onChange={handleChange}
                placeholder="Enter your username"
              />
              <span ref={usernameErrRef} className="form-field__error"></span>
            </div>
            <div className="form-field">
              <label htmlFor="password" className="form-field__label">
                Password
              </label>
              <input
                type="text"
                className="form-field__input"
                id="password"
                name="password"
                value={inputs.password || ""}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <span ref={passwordErrRef} className="form-field__error"></span>
            </div>
            <div className="form-field">
              <label htmlFor="confirm-password" className="form-field__label">
                Confirm password
              </label>
              <input
                type="text"
                className="form-field__input"
                id="confirm-password"
                name="confirm_password"
                value={inputs.confirm_password || ""}
                onChange={handleChange}
                placeholder="Confirm your password"
              />
              <span
                ref={confirmPasswordErrRef}
                className="form-field__error"
              ></span>
            </div>
            <div className="form-field">
              <label htmlFor="full-name" className="form-field__label">
                Full name
              </label>
              <input
                type="text"
                className="form-field__input"
                id="fullname"
                name="fullname"
                value={inputs.fullname || ""}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
              <span ref={fullnameErrRef} className="form-field__error"></span>
            </div>
            <div ref={internalErrRef} className="form-field__error"></div>
            <div className="form-field">
              <input
                type="submit"
                value="Register"
                className="form-field__input"
                id="username"
                name="username"
                placeholder="Enter your username"
              />
            </div>
          </form>
          <p className="form-extra-text">
            Already had an account?{" "}
            <span className="form-extra-text__link" onClick={() => {setShowLoginForm(true), setShowRegisterForm(false)}}>Sign in</span>
          </p>
        </div>
      </div>
    </div>
  );
}
