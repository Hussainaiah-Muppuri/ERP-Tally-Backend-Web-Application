import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MainNavBar.css';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';



const MainNavBar = () => {

  const history = useHistory();
  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', false);
    localStorage.setItem('IsCompanyLoggedIn', false);
    history.push('/');
  };

  return (
    <div className='MainNav'>
     <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGUIJNJNHXHpFVVIfnPQcZRmMzA_l8oYI4YEDHErtwTs9Q5jq82V5ycdRcriHbmokf1tw&usqp=CAU' alt="Your Logo" height="30" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link custom-link" href="#">
                  Print
                </a>
              </li>
              <li className="nav-item custom-link">
                <a className="nav-link" href="#">
                  Export
                </a>
              </li>
              <li className="nav-item custom-link">
                <a className="nav-link" href="#">
                  E-mail
                </a>
              </li>
              <li className="nav-item custom-link">
                <a className="nav-link" href="#">
                  Upload
                </a>
              </li>
              <li className="nav-item custom-link">
                <a className="nav-link" href="#">
                  Help
                </a>
              </li>
              <li className="nav-item custom-link">
                <a className="nav-link" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                  Logout &nbsp; <FontAwesomeIcon icon={faSignOutAlt} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MainNavBar;
