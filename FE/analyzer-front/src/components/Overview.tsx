import { useUserStore } from '@stores/UserStore';
import React from 'react';

const Overview = () => {
  const userStore = useUserStore();
  return (
    <div className="mypage_cont">
      <div className="page_title">
        <h4>Overview</h4>
      </div>
      <div className="page_cont">
        <div className="account_first">
          <div className="account_box">
            <h4>My Account</h4>
            {userStore.account ? (
              <div>{userStore.account}</div>
            ) : (
              <div className="disconnected">
                <p>현재 연결된 upbit 계정이 없습니다.</p>
                <i>
                  <a href="https://upbit.com" target="_blank">
                    upbit 계정을 연결하겠습니까?
                  </a>
                </i>
              </div>
            )}
          </div>
          <div className="account_dist">
            <h4>Account Distribution</h4>
            {userStore.account ? (
              <div>{userStore.account}</div>
            ) : (
              <div className="disconnected">
                <p>현재 연결된 upbit 계정이 없습니다.</p>
                <i>
                  <a href="https://upbit.com" target="_blank">
                    upbit 계정을 연결하겠습니까?
                  </a>
                </i>
              </div>
            )}
          </div>
        </div>
        <div className="account_orderlist">
          <h4>Latest Orders</h4>
          {userStore.account ? (
            <div>{userStore.account}</div>
          ) : (
            <div className="disconnected">
              <p>현재 연결된 upbit 계정이 없습니다.</p>
              <i>
                <a href="https://upbit.com" target="_blank">
                  upbit 계정을 연결하겠습니까?
                </a>
              </i>
            </div>
          )}
        </div>
        <div className="watchlist">
          <h4>Watchlist</h4>
          {userStore.watchlist ? (
            <div>
              {userStore.watchlist.map((i) => (
                <li>{i}</li>
              ))}
            </div>
          ) : (
            <div className="disconnected">
              <p>현재 Watchlist에 추가된 목록이 없습니다.</p>
              <i>
                <a href="/cryptocurrency" target="_self">
                  코인 목록 보기
                </a>
              </i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;
