import React from "react";
import styled from "styled-components";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { signupFB } from "./redux/modules/user";

const Signup = () => {
  const dispatch = useDispatch();
  const id = React.useRef("");
  const pwd = React.useRef("");
  const pwdCheck = React.useRef("");
  const name = React.useRef("");

  const signup = (id, pwd, name) => {
    if (
      id.current.value === "" ||
      pwd.current.value === "" ||
      name.current.value === ""
    ) {
      alert("아이디, 닉네임, 비밀번호는 필수입니다");
      return;
    } else if (pwd.current.value !== pwdCheck.current.value) {
      alert("비밀번호 확인이 틀립니다.");
      return;
    }
    dispatch(signupFB(id.current.value, pwd.current.value, name.current.value));
  };
  return (
    <Container>
      <div>
        <h1>회원가입</h1>
      </div>
      <div>
        <label htmlFor="아이디">아이디</label>
        <input
          ref={id}
          id="아이디"
          type="text"
          placeholder="sample@magazine.com..."
        ></input>
        <label htmlFor="닉네임">닉네임</label>
        <input
          ref={name}
          id="닉네임"
          type="text"
          placeholder="닉네임을 입력해주세요"
        ></input>
        <label htmlFor="비밀번호">비밀번호</label>
        <input
          ref={pwd}
          id="비밀번호"
          type="password"
          placeholder="비밀번호는 최소 6자 이상입니다."
        ></input>
        <label htmlFor="비밀번호확인">비밀번호확인</label>
        <input
          ref={pwdCheck}
          id="비밀번호확인"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
        ></input>
      </div>
      <div>
        <button
          onClick={() => {
            signup(id, pwd, name);
          }}
        >
          회원가입하기
        </button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  background-color: RGB(24, 24, 24);
  color: white;
  width: 60%;
  height: 500px;
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
        margin-top: 20px;
      }
    }
  }
`;

export default Signup;
