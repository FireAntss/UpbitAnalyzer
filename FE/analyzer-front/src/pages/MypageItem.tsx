import { useUserStore } from '@stores/UserStore';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Image } from 'react-bootstrap-icons';
import Overview from '@components/Overview';
import Activities from '@components/Activities';

const MypageItem = () => {
  const { page } = useParams<{ page: string }>();
  const userStore = useUserStore();

  const placeholderSpan = () => (
    <div className="placeholder-glow">
      <span className="placeholder col"></span>
    </div>
  );
  return userStore.isAuthenticated ? (
    <div className="mypage container mt-3">
      <div className="sidebar">
        <div className="user_box">
          <div className="profile">
            <div className="user_profile">
              <img src={userStore.profile} alt="" />
              <button className="btn btn-outline-secondary">
                <Image />
              </button>
            </div>
            <div className="userinfo">
              <div>
                <span>{userStore.username}</span>
                <span>{userStore.nickname}</span>
              </div>
              <div>
                <span>{userStore.account ? userStore.account : '-'}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="sidebar_nav">
          <ul>
            <li>
              <Link to={`/mypage/overview`}>Overview</Link>
            </li>
            <li>
              <Link to={`/mypage/activities`}>내 활동</Link>
            </li>
            <li>
              <Link to={`/mypage/settings`}>계정설정</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="main">{page === 'overview' && <Overview />}</div>
      <div className="main">{page === 'activities' && <Activities />}</div>
    </div>
  ) : (
    <div>로그인필요</div>
  );
};

export default MypageItem;
