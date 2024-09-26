import { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import Avt from "../../assets/img/avt.png";
import Menu from "../menu/Menu.jsx";
import "./Navbar.scss";
import Register from "../register/Register.jsx";
import Login from "../login/Login.jsx";
import Cookies from "js-cookie";
import { UserContext } from "../../contexts/user.context.jsx";
import { io } from "socket.io-client";

const Navbar = () => {
  const { user, login, logout } = useContext(UserContext);
  const [arrivalNotification, setArrivalNotification] = useState(null)
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  let socket = useRef(null);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      login(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  const inputRef = useRef();
  const [isFocused, setIsFocused] = useState(false);
  const [searchOptions, setSearchOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  //Socket initialization
  //Socket notification
  useEffect(() => {
    socket.current = io("ws://localhost:8900");

    socket.current.on("getNotification", (data) => {
      setArrivalNotification({
        senderName: data.senderName,
        message: data.message,
        orderId: data.orderId,
        createdAt: Date.now()
      })
      console.log(data)
    });
  }, []);

  useEffect(()=>{
    if(arrivalNotification){
      notifications.push(arrivalNotification)
    }
    console.log(notifications)
  },[arrivalNotification])
  useEffect(() => {
    if(user){
      socket.current.emit("addUser", user._id);
      socket.current.on("getUsers", (users) => {});
      console.log('5')
    }
  }, [user]);

  // Toggle display menu
  const menuRef = useRef();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    let handler = (e) => {
      if (menuRef && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  // Toggle display Login form
  const openLoginBtnRef = useRef();
  const [showLoginForm, setShowLoginForm] = useState(false);

  useEffect(() => {
    let handler = (e) => {
      if (openLoginBtnRef && !openLoginBtnRef.current.contains(e.target)) {
        setShowLoginForm(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  // Toggle display Register form
  const openRegisterBtnRef = useRef();
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  useEffect(() => {
    let handler = (e) => {
      if (
        openRegisterBtnRef &&
        !openRegisterBtnRef.current.contains(e.target)
      ) {
        setShowRegisterForm(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const focusInput = () => {
    setIsFocused(true);
  };
  const blurInput = () => {
    setIsFocused(false);
    setShowDropdown(false);
  };

  useEffect(() => {
    // This will be called after isFocused has been updated
    const inputValue = inputRef.current.value;
    setShowDropdown(isFocused && inputValue.length > 0);
  }, [isFocused]); // Run the effect when isFocused changes

  const handleInputChange = (e) => {
    const userInput = e.target.value;

    // Simulating asynchronous data fetching
    setTimeout(() => {
      setSearchOptions([
        {
          category: "Artworks",
          items: [
            "Character Design 01",
            "Character Design 02",
            "Character Design 03",
          ],
          count: 1700,
        },
        {
          category: "Artists",
          items: [
            {
              avt: "data:image/jpeg;base64,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",
              name: "Artist 01",
            },
            {
              avt: "https://media.gettyimages.com/id/180699358/photo/peacock.jpg?s=612x612&w=gi&k=20&c=GPwrga6Yv3F8F8C17IdW6k1Gf2Zbf4pkcK7Gc0MVTdI=",
              name: "Artist 01",
            },
            {
              avt: "https://cdn.esawebb.org/archives/images/screen/carinanebula3.jpg",
              name: "Artist 01",
            },
          ],
          count: 1700,
        },
        // Add more categories as needed
      ]);

      // Update showDropdown based on input length
      setShowDropdown(isFocused && userInput.length > 0);
    }, 100);
  };

  const displayNotification = ({ message, orderId }) => {
    return (
      <Link to={`/order_dashboard/:${orderId}`}>
        <span className="notification">{message}</span>
      </Link>
    );
  };
  console.log(arrivalNotification)
  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/">
          <div className="brand">
            <img src={Logo} alt="Logo" className="brand-logo" />
            <p className="brand-name">ArtHub</p>
          </div>
        </Link>
        <div
          className={`form search-form ${isFocused ? "focused" : ""}`}
          onClick={focusInput}
          onBlur={blurInput}
        >
          <div className="form-field">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAcFJREFUSEu11curTmEUx/HPiQzkUpTLREgYuEXJAIUilKlLMSBFYUAZ+APIhIQwoJCUP+B0RgohE6RElBIZkEvkfm3VOnq9zt7vM9jvGu5n7fV91uW3nh5dtp4ux1cHmID1WIXZeZE76MVFPC+53ECAETiPNTUBfuMSNuNTHagdMBS3MANfcQpH8CSDTMZubMWQ9F2E71WQdsA5bMQzrMCDih9noQ/jcQh7SgAzcQ8/MB9R7zpbjCv4hkl4MZBzawZHsQPHsLOkgbiADdiHA50AjzEl63+/ELAEl3ENkdF/1prBR0STB+FXIWAUXuMNRncCvMdwDEPASix8P+AVxnQC3E1BzcPtkuhYgJtZpmWdAAexFyexvRBwFpsQA7KrE2AqHuJn4ZiGwK5m0Mqs24V2OuX/FMvxqCKTOSm0san2bSVCC5/WVfEFJ3A4lR3nkWWsii0YnEGjB6H6aHbtmPYfjkwBra7pwzvsxzrMTdUvRXz/x+rW9cRU6UrE7vmc03UDx/EWoYMQWqzzmMKYpNDEX2viwQnIdUxHbIOFeNlPaAIQsUJkMVHTsj9nmgZEvHFYm+9HoyWq1WRTJaqEdB3wBzsRVhkyGVX0AAAAAElFTkSuQmCC"
              alt="Search Icon"
            />
            <input
              type="text"
              className=""
              placeholder="Search for artworks, artists, ..."
              ref={inputRef}
              onChange={handleInputChange}
            />
          </div>
          {showDropdown && (
            <div className="dropdown-search-container">
              {searchOptions.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h3>{category.category}</h3>
                  <hr />
                  <ul>
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="dropdown-search-item">
                        {!item.avt && <p>{item}</p>}

                        {item.avt ? (
                          <>
                            <img
                              src={item.avt}
                              alt={`Avatar of ${item.name}`}
                            />
                            <span>{item.name}</span>
                          </>
                        ) : (
                          ""
                        )}
                      </li>
                    ))}
                  </ul>
                  <p className="dropdown-search-item__extra">
                    +{category.count} more
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="nav-right">
        <ul className="nav-right-container">
          <li
            className={`nav-right-item ${
              location.pathname.includes("/artworks") ? "active" : ""
            }`}
          >
            <Link to="/artworks">Artworks</Link>
          </li>
          <li
            className={`nav-right-item ${
              location.pathname.includes("/talents") ? "active" : ""
            }`}
          >
            <Link to="/talents">Talents</Link>
          </li>
          <li
            className={`nav-right-item ${
              location.pathname.includes("/collections") ? "active" : ""
            }`}
          >
            <Link to="/collections">Collections</Link>
          </li>
          <li
            className={`nav-right-item ${
              location.pathname.includes("/challenges") ? "active" : ""
            }`}
          >
            <Link to="/challenges">Challenges</Link>
          </li>
          <li
            className={`nav-right-item ${
              location.pathname.includes("/commissions") ? "active" : ""
            }`}
          >
            <Link to="/commissions">Commissions</Link>
          </li>
        </ul>

        <hr className="hor-hr" />

        <div className="nav-right-icon-container">
          <div onClick={() => setOpen(!open)} className="nav-right-icon-item">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAWVJREFUSEvN1TFIlVEYxvGfuBkOitBQWgYKQkN7DYKKQ4uiiM6ubSm1qYMICo7i3BIi4ioqCgnuDgoOhkKgBIJB0BBUfPF9d/juPfc7V7noOz/n+T/nPe85p0Gdq6HO/moBjOFTGmgCmzHhYgBNmMQ8mlPTH5jDKn5VAxUB+vEZbQGT7xjFQQhSDTCMdTRiAyvYS4368A5D+I232KkECQEe4wyP8B7LgYQzmMUVuvAzrwsBljCFNYwXHOYWBkNBQoALdOAVjgoAA9jGIV7H7uBvKkz6/6cA0Ipr3KClVkDRlGV+WaAyfcgguCCwm4cFeIbzNGmtLXqOZEBKlTd4ii/oxDFexrw3OEEPvuINLrN1ecApuisJC0BP0mAv8sHygOyw2vEtMn0mq9jaEKBG7zJ5yTcP2EfvHd13kdzu/xU7JbdmxgI+YiFH+YDFInIsINElL+xIapj8D9PIhiLIiQUUBb0/wD/3oz4ZE6fqJQAAAABJRU5ErkJggg==" />
          </div>
          <div>
            {open && (
              <div className="notifications">
                {notifications.map((n) => displayNotification(n))}
                <button className="nButton">
                  Mark as read
                </button>
              </div>
            )}
          </div>
          <div className="nav-right-icon-item">
            Cart
            {/* <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAO5JREFUSEvd1TFuwkAQheGPMlcIEhKKlOQaOQEtV0hNGhpqaKKUHCEn4AAcgYJ0EUhRrpAmCLQSlmzL9hqMpRA3W8zO+3fe7I47Wv46LetLAwaY4rEh9AMvWASdNOAL3YbiSfon7vKA/THa1LaMTlrsfwKSqmKtKXUiZlHrgNjJi+J/q8lVFpVd55MqaB1w/T24aAVb9EoUk4Y+YY77CHmDfn7YhXE9w0NB8i1eMaxR0grjonFd9Wh+cIOwTvCG3xqwzP+gChBi7xjhu45wsic2+8M7WOMZy1OE6wLCiYMdu3PE800+V6MyL2ZRY+gBDRc1GbMbgpYAAAAASUVORK5CYII=" /> */}
          </div>
        </div>

        {
          <div
            className={`nav-right-menu ${!user ? "hide" : ""}`}
            ref={menuRef}
          >
            {user && (
              <img
                src={user.avatar}
                className="nav-right-menu__avt"
                onClick={() => {
                  setShowMenu(!showMenu);
                }}
                alt="Avatar"
              />
            )}
            {user && showMenu && <Menu />}
          </div>
        }

        {/* Login form */}
        <div
          ref={openLoginBtnRef}
          className={`open-login-form-btn ${user ? "hide" : ""}`}
        >
          <button
            className="authentication-btn login-btn"
            onClick={() => {
              setShowLoginForm(!showLoginForm);
            }}
          >
            Sign in
          </button>
          {showLoginForm && (
            <Login
              setShowLoginForm={setShowLoginForm}
              setShowRegisterForm={setShowRegisterForm}
            />
          )}
        </div>

        {/* Register form */}
        <div
          ref={openRegisterBtnRef}
          className={`open-register-form-btn ${user ? "hide" : ""}`}
        >
          {/* <button onClick={() => setShowRegisterForm(!showRegisterForm)}>
            Sign up
          </button> */}
          {showRegisterForm && (
            <Register
              setShowLoginForm={setShowLoginForm}
              setShowRegisterForm={setShowRegisterForm}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
