import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { getCookie, deleteCookie } from "./shared/Cookie";
import { logOut, logoutFB } from "../src/redux/modules/user";
import { apiKey } from "./shared/firebase";

const Header = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;

  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  if (is_login && is_session) {
    return (
      <Container>
        <img
          onClick={() => history.push("/")}
          src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FTpIrS%2Fbtryd86q45X%2FxoldI5PisVKnL8dcK73pqK%2Fimg.png"
        ></img>
        <div>
          <button>내정보</button>
          <button>알림</button>
          <button
            onClick={() => {
              dispatch(logoutFB({}));
            }}
          >
            로그아웃
          </button>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <img
        onClick={() => history.push("/")}
        src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FTpIrS%2Fbtryd86q45X%2FxoldI5PisVKnL8dcK73pqK%2Fimg.png"
      ></img>
      <div>
        <button
          onClick={() => {
            history.push("/signup");
          }}
        >
          회원가입
        </button>
        <button
          onClick={() => {
            history.push("/login");
          }}
        >
          로그인
        </button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  background-color: rgb(24, 24, 24);
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 40px;
  button {
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    background-color: RGB(248, 16, 1);
    margin-left: 20px;
    color: white;
  }
  img {
    width: 150px;
    height: 80px;
  }
`;

export default Header;
