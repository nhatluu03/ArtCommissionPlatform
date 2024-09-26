import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationBg from "../../assets/img/authentication-bg.png";
import "../../assets/scss/authentication.scss";
import "./Login.scss";
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
import { UserContext } from "../../contexts/user.context.jsx";

export default function Login({ setShowLoginForm, setShowRegisterForm }) {
  const { user, login, logout } = useContext(UserContext);

  const [inputs, setInputs] = useState({});
  const usernameErrRef = useRef();
  const passwordErrRef = useRef();
  const internalErrRef = useRef();
  const navigate = useNavigate();


  function validateInputs() {
    const usernameVal = inputs.username;
    const passwordVal = inputs.password;
    let isValidUsername = false;
    let isValidPassword = false;

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

    console.log(
      isValidUsername,
      isValidPassword
    );

    return (
      isValidUsername &&
      isValidPassword
    );
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    inputs.role = "client";
    const { confirm_password, ...others } = inputs;
    console.log(others);

    // FE validation
    let isValidLoginInfo = true
    // let isValidLoginInfo = validateInputs();
    if (isValidLoginInfo) {
      try {
        const response = await axios.post(
          "http://localhost:3000/users/login",
          others,{
            withCredentials: true,
          }
        );
        console.log(response.data);
        console.log(response);
        if (response.status == 200) {
          alert("Login successfully");

          const user = response.data;
          login(user);
          console.log("User data after Login: " + JSON.stringify(user));
          console.log(document.cookie)
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
      <div className="authentication login">
        <div className="authentication-left">
          <img src={AuthenticationBg} alt="Background image of Login" />
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
          <form className="form login-form" onSubmit={handleSubmit}>
            <img
              className="form-close-ic"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAARNJREFUSEvt1DtKBEEURuFvUkFMlFEwEBF0DYMPUFNxG2IquBOZxEhwA+IKVIxUTH1grKGuQC6U0EhPVTnQmEyFTdV/7j11u3o6Xr2O800ARcP/rugYZ3gfUeoqNnA6qpVcB4c4wQs2WyAruMY89nHRBskB4mAERNBrqvSnk2Xcoo9HbOHrr4DY3waZqg2PgJpLXsBV6uQJMwl8jx185kapBhDnF5OupRSW1dIE1gLCdTgP97EesF2qvlZRhN8kRc9JUXy7w24JUuqgWfkbBphujGexkxygLfwjKYrRDWVzJV05wAGGCC0x57//5rXUySz2cDnOf3CE88xTEZD1cZ+K4ktZs6F0yTUZ2T0TQFFh54q+ARi0NBkujYiHAAAAAElFTkSuQmCC"
              onClick={() => {
                setShowLoginForm(false);
              }}
            />
            <h2 className="form-title">Sign In</h2>
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
            <span ref={internalErrRef} className="form-field__error"></span>
            <div className="form-field">
              <input
                type="submit"
                value="Login"
                className="form-field__input"
                id="username"
                name="username"
                placeholder="Enter your username"
              />
            </div>
          </form>
          <p className="form-extra-text">
            Not have an account yet?{" "}
            <span className="form-extra-text__link" onClick={() => {setShowRegisterForm(true), setShowLoginForm(false)}}>Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
}
