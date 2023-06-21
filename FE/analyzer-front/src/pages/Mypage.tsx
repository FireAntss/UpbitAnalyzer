import { useUserStore } from '@stores/UserStore';
import React, { useState } from 'react';
import { Image } from 'react-bootstrap-icons';
import { Link, Navigate } from 'react-router-dom';
import MypageItem from './MypageItem';

const Mypage = () => {
  const userStore = useUserStore();
  return <Navigate to={`/mypage/overview`} replace={true}></Navigate>;
};
export default Mypage;
