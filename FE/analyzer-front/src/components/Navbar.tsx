import React from 'react';
import { Link } from 'react-router-dom';
import AuthBox from './AuthBox';

const Navbar = () => {
  return (
    <div className="header_view">
      <div className="header_wrapper">
        <header>
          <div className="container-fluid d-nav">
            <div className="d-nav">
              <Link className="d-nav logo_link" to={'/'}>
                <div className="logo_box">
                  <img src="/assets/betaLogo.png" alt="logo" height={28} />
                </div>
              </Link>
              <ul className="d-nav-list gap-3">
                <li>
                  <Link className="flex-sm-fill text-sm-center nav-link" to={'/cryptocurrency'}>
                    암호화폐
                  </Link>
                </li>
                <li>
                  <Link className="flex-sm-fill text-sm-center nav-link" to={'/market'}>
                    거래소
                  </Link>
                </li>
                <li>
                  <Link className="flex-sm-fill text-sm-center nav-link" to={'/community'}>
                    커뮤니티
                  </Link>
                </li>
                <li>
                  <Link className="flex-sm-fill text-sm-center nav-link" to={'/learn'}>
                    학습
                  </Link>
                </li>
              </ul>
            </div>
            <div className="d-nav user-section">
              <AuthBox />
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Navbar;
