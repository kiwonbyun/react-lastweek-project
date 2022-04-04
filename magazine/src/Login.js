import React from "react";
import { useRef } from "react";
import styled from "styled-components";
import { setCookie, getCookie, deleteCookie } from "./shared/Cookie";
import { useDispatch } from "react-redux";
import { logIn, loginFB } from "./redux/modules/user";

const Login = () => {
  const dispatch = useDispatch();
  const id = React.useRef("");
  const pwd = React.useRef("");
  const login = (id, pwd) => {
    if (id.current.value === "" || pwd.current.value === "") {
      alert("아이디, 패스워드는 필수입니다.");
      return;
    }
    dispatch(loginFB(id.current.value, pwd.current.value));
  };
  return (
    <Container>
      <div>
        <h1>로그인</h1>
      </div>
      <div>
        <label htmlFor="아이디">아이디</label>
        <input
          ref={id}
          id="아이디"
          type="text"
          placeholder="아이디를 입력해주세요"
        ></input>
        <label htmlFor="비밀번호">비밀번호</label>
        <input
          ref={pwd}
          id="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요"
        ></input>
      </div>
      <div>
        <button
          onClick={() => {
            login(id, pwd);
          }}
        >
          로그인하기
        </button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  color: white;
  width: 60%;
  height: 350px;
  margin: auto;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  div {
    &:first-child {
      margin-top: 20px;
      font-size: 30px;
      padding-left: 30px;
    }
    &:nth-child(2) {
      padding-left: 30px;
      display: flex;
      flex-direction: column;
      label {
        margin-top: 20px;
      }
      input {
        margin-top: 3px;
        padding: 7px 5px;
        font-size: 15px;
        border: 1px solid skyblue;
        transition: 0.5s;
        &:focus {
          outline: none;
          border: 3px solid skyblue;
        }
      }
    }
    &:last-child {
      margin: 0px auto;
      button {
        padding: 10px 200px;
        border: none;
        border-radius: 20px;
        background-color: RGB(248, 16, 1);
        color: white;
      }
    }
  }
`;

export default Login;
