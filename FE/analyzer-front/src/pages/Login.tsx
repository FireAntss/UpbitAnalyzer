import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useUserStore } from '@stores/UserStore';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const store = useUserStore();
  const navigate = useNavigate();

  const proceedLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let regObj = { username: username, password: password };
    if (validate()) {
      axios
        .post(`http://localhost:8080/login`, regObj, {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' }
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            toast.success(`${username}님, 환영합니다!`);
            store.login(username, res.headers.authorization);
            navigate('/');
          } else if (Object.keys(username).length === 0) {
            toast.error('올바른 username을 입력해주세요.');
          }
        });
    }
  };

  const validate = () => {
    let result = true;
    if (username === '' || username === null) {
      result = false;
      toast.warning('username을 입력해주세요.');
    }
    if (password === '' || password === null) {
      result = false;
      toast.warning('비밀번호를 입력해주세요.');
    }
    return result;
  };

  return (
    <div className="container">
      <div className="login">
        <form onSubmit={proceedLogin} className="container_inner">
          <div className="login_cont">
            <div className="card-header">
              <h2>User Login</h2>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>
                  username<span className="errmsg">*</span>
                </label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control"
                  type="text"
                  name="username"
                  id="username"
                />
              </div>

              <div className="form-group">
                <label>
                  Password<span className="errmsg">*</span>
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
            </div>
            <div className="login_submit">
              <button type="submit" className="btn btn-primary me-2">
                로그인
              </button>
              <Link className="btn btn-outline-secondary" to={'/register'}>
                회원가입
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
