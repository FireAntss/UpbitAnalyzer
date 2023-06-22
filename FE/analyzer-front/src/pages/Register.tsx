import React, { useCallback, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// TODO: https://www.youtube.com/watch?v=5OV-TYyJEnw&list=PLfyWdpsiUiPCQzWk1YV0vi-0arAzXm_1B&index=29&t=10s
const Register = () => {
  const [username, changeUsername] = useState('');
  const [nickname, changeNickname] = useState('');
  const [password, changePassword] = useState('');
  const [phone, changePhone] = useState('');
  const [profile, setProfile] = useState('');

  const navigate = useNavigate();

  //TODO: 아래 인증 메시지는 toast보다 form 아래에 콜백을 사용하는게 더 괜찮을 수도 있겠다.
  const isValidate = () => {
    let isProceed = true;
    let errMsg = '다음 값이 비었습니다: ';
    if (username === null || username === '') {
      isProceed = false;
      errMsg += 'username ';
    }
    if (password === null || password === '') {
      isProceed = false;
      errMsg += 'password ';
    }
    if (nickname === null || nickname === '') {
      isProceed = false;
      errMsg += 'nickname ';
    }
    if (phone === null || phone === '') {
      isProceed = false;
      errMsg += 'phone ';
    }
    if (!isProceed) {
      toast.warning(errMsg);
    }

    return isProceed;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let regObj = { username, nickname, password, phone, profile };

    if (isValidate()) {
      axios
        .post('http://localhost:8080/api/v1/users/join', regObj, {
          headers: { 'Content-Type': 'application/json' }
        })
        .then((res) => {
          toast.success('회원가입 성공!');
          console.log(res);
          navigate('/login');
        })
        .catch((err) => {
          toast.error('회원가입 실패 : ' + err.message);
        });
    }
  };

  useEffect(() => {
    const generateProfile = (): string => {
      const variant = 'beam';
      const size = 120;
      const randomColor = () =>
        '#000000'.replace(/0/g, function () {
          return (~~(Math.random() * 16)).toString(16);
        });
      const colors = Array.from({ length: 5 }, () => randomColor());
      const profileUrl = `https://source.boringavatars.com/${variant}/${size}/${username}?colors=${colors}`;

      return profileUrl;
    };

    const generatedProfile = generateProfile();
    setProfile(generatedProfile);
  }, []);

  //TODO: 아래 Bootstrap 코드는 모두 인라인 코드로 되어있어, 가시성은 높지만 중복이 많기 때문에 클래스를 사용하거나, 함수로 추출할 수 있다.
  return (
    <div className="container">
      <div className="register">
        <form className="container_inner" onSubmit={handleSubmit}>
          <div className="register_cont">
            <div className="card-header">
              <h2>User Registration</h2>
            </div>

            <div className="card-body">
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label>
                      username<span className="errmsg">*</span>
                    </label>
                    <input
                      value={username}
                      onChange={(e) => changeUsername(e.target.value)}
                      className="form-control"
                      type="text"
                      name="username"
                      id="username"
                    />
                  </div>
                </div>

                <div className="col">
                  <div className="form-group">
                    <label>
                      별명<span className="errmsg">*</span>
                    </label>
                    <input
                      value={nickname}
                      onChange={(e) => changeNickname(e.target.value)}
                      className="form-control"
                      type="nickname"
                      name="nickname"
                      id="nickname"
                    />
                  </div>
                </div>

                <div className="col">
                  <div className="form-group">
                    <label>
                      Password<span className="errmsg">*</span>
                    </label>
                    <input
                      value={password}
                      onChange={(e) => changePassword(e.target.value)}
                      className="form-control"
                      type="text"
                      name="password"
                      id="password"
                    />
                  </div>
                </div>

                <div className="col">
                  <div className="form-group">
                    <label>
                      Phone<span className="errmsg">*</span>
                    </label>
                    <input
                      value={phone}
                      onChange={(e) => changePhone(e.target.value)}
                      className="form-control"
                      type="text"
                      name="phone"
                      id="phone"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="register_submit">
              <div className="buttons">
                <button type="submit" className="btn btn-primary">
                  회원가입
                </button>
                <a className="btn btn-danger" href="/">
                  홈으로
                </a>
              </div>
              <p>
                이미 회원이신가요? <Link to={'/login'}>로그인하기</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
