import React from "react";
import { useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { actionCreators } from "./redux/modules/post";
import { uploadImageFB, setPreview } from "./redux/modules/image";
import { storage } from "./shared/firebase";

const Add = () => {
  const dispatch = useDispatch();
  const fileInput = useRef("");
  const history = useHistory();
  const contents = useRef("");
  const preview = useSelector((state) => state.image.preview);
  const is_uploading = useSelector((state) => state.image.uploading);
  const addpost = (e) => {
    dispatch(actionCreators.addPostFB(contents.current.value));
  };
  const uploadFB = () => {
    let image = fileInput.current.files[0];
    dispatch(uploadImageFB(image));
  };
  const selectFile = () => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(setPreview(reader.result));
    };
  };

  const is_login = useSelector((state) => state.user.is_login);
  if (!is_login) {
    return (
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>앗 잠깐!</h1>
        <h3>로그인 후에만 글을 쓸 수 있어요!</h3>
        <button onClick={() => history.replace("/login")}>
          로그인 하러가기
        </button>
      </Container>
    );
  }
  return (
    <Container>
      <h1>게시글 작성</h1>
      <Filebox>
        <input
          type="file"
          placeholder="사진을 선택해주세용!"
          ref={fileInput}
          onChange={selectFile}
          disabled={is_uploading}
        ></input>
        <button onClick={uploadFB}>테스트업로드</button>
      </Filebox>
      <h3>레이아웃 고르기</h3>
      <Uploadbox>
        <img
          src={
            preview
              ? preview
              : "https://user-images.githubusercontent.com/2351721/31314483-7611c488-ac0e-11e7-97d1-3cfc1c79610e.png"
          }
        ></img>
        <h4>게시물 내용</h4>
        <form>
          <textarea ref={contents}></textarea>
          <button onClick={addpost}>게시글 작성</button>
        </form>
      </Uploadbox>
    </Container>
  );
};

const Container = styled.div`
  color: white;
  width: 70%;
  margin: auto;
  height: 100vh;
  margin-top: 30px;
  h1 {
    font-size: 35px;
  }
  h3 {
    font-size: 25px;
  }
  button {
    margin-top: 30px;
    background-color: RGB(248, 16, 1);
    color: white;
    height: 30px;
    border: none;
    border-radius: 10px;
  }
`;

const Filebox = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  button {
    background-color: RGB(248, 16, 1);
    color: white;
    height: 30px;
    border: none;
    border-radius: 10px;
  }
`;

const Uploadbox = styled.div`
  img {
    width: 70%;
  }
  h4 {
    font-size: 25px;
  }
  form {
    textarea {
      width: 100%;
      height: 100px;
    }
    button {
      margin: auto;
      margin-top: 15px;
      width: 100%;
      border: none;
      background-color: RGB(248, 16, 1);
      color: white;
      height: 40px;
      border-radius: 12px;
    }
  }
`;

export default Add;
