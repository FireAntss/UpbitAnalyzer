import { UserType, useUserStore } from '@stores/UserStore';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AuthBox = () => {
  const store = useUserStore();

  const handleLogout = () => {
    store.logout();
  };

  useEffect(() => {
    if (store.isAuthenticated) {
      fetchUserInfo();
    }
  }, [store.isAuthenticated]);

  const fetchUserInfo = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/users/userInfo', null, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: store.accessKey
        }
      });
      console.log(store.accessKey);
      store.setUser(response.data); // user 값을 업데이트
      console.log(store.user);
    } catch (error) {
      console.error('API request error:', error);
    }
  };

  return (
    <div className="user_box">
      {store.isAuthenticated ? (
        <>
          <Link className="user_button authed profile" type="button" to={'/mypage'}>
            <img src={store.user?.profile} alt={`${store.username} avatar`} height={24} />
          </Link>
          <button className="user_button authed" type="button" onClick={handleLogout}>
            <small>로그아웃</small>
          </button>
        </>
      ) : (
        <>
          <Link className="user_button unauthed" type="button" to={'/login'}>
            <small>로그인</small>
          </Link>
          <Link className="user_button unauthed signup" type="button" to={'/register'}>
            <small>회원가입</small>
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthBox;
