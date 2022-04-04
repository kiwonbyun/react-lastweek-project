import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { apiKey } from "./shared/firebase";

const Notice = () => {
  const is_login = useSelector((state) => state.user.is_login);
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;
  if (is_login && is_session) {
    return (
      <Container>
        <NoticeCard>
          <Imgdiv>
            <img></img>
          </Imgdiv>
          <div>
            <span>nickname님이 게시글에 댓글을 남겼습니다!</span>
          </div>
        </NoticeCard>
      </Container>
    );
  }
  return (
    <Container>
      <h1>로그인 회원만 볼수있습니다.</h1>
      <button>로그인 하러가기</button>
    </Container>
  );
};
const NoticeCard = styled.div`
  border: 1px solid white;
  width: 50%;
  height: 130px;
  display: flex;
  align-items: center;
  div {
    &:nth-child(2) {
      margin: auto;
    }
  }
`;
const Imgdiv = styled.div`
  background-color: white;
  width: 130px;
  height: 90%;
  margin: auto 3px;
`;

const Container = styled.div`
  color: white;
  margin: 50px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-size: 30px;
  }
  button {
    margin-top: 100px;
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    background-color: RGB(248, 16, 1);
    color: white;
  }
`;
export default Notice;
