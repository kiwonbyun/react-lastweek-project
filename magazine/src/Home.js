import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { apiKey } from "./shared/firebase";
import { useHistory } from "react-router-dom";
import { actionCreators } from "./redux/modules/post";

const Home = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  React.useEffect(() => {
    if (post_list.length === 0) {
      dispatch(actionCreators.getPostFB());
    }
  }, []);
  console.log(post_list);
  const is_login = useSelector((state) => state.user.is_login);
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;
  if (is_login && is_session) {
    return (
      <div>
        {post_list.map((list, index) => {
          return (
            <PostCard key={index}>
              <div>
                <img src={list.user_info.user_profile}></img>
                <h3>{list.user_info.name}</h3>
                <span>{list.insert_dt}</span>
              </div>
              <div>
                <span>{list.contents}</span>
                <img src={list.image_url}></img>
              </div>
              <div>
                <span>좋아요 {}개</span>
                <span>댓글 {list.comment_cnt}개</span>
              </div>
            </PostCard>
          );
        })}
        <Addbutton onClick={() => history.push("/write")}>글쓰기</Addbutton>
      </div>
    );
  }
  return (
    <Container>
      {post_list.map((list, index) => {
        return (
          <PostCard key={index}>
            <div>
              <img src={list.user_info.user_profile}></img>
              <h3>{list.user_info.name}</h3>
              <span>{list.insert_dt}</span>
            </div>
            <div>
              <span>{list.contents}</span>
              <img src={list.image_url}></img>
            </div>
            <div>
              <span>좋아요 {}개</span>
              <span>댓글 {list.comment_cnt}개</span>
            </div>
          </PostCard>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  background-color: rgb(33, 33, 33);
  height: 100vh;
`;

const Addbutton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 9999px;
  border: none;
  background-color: tomato;
  color: white;
  position: fixed;
  bottom: 50px;
  right: 50px;
`;

const PostCard = styled.div`
  border: 1px solid black;
  background-color: rgb(56, 56, 56);
  border-radius: 5px;
  width: 80%;
  margin: auto;
  color: white;
  div {
    &:first-child {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 20px;
      img {
        width: 50px;
        height: 50px;
        border-radius: 999px;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-direction: column;
      span {
        margin: 10px;
        padding: 0px 10px;
      }
      img {
        margin: auto;
        width: 70%;
      }
    }
    &:last-child {
      margin: 10px;
      span {
        margin-right: 30px;
        padding: 0px 10px;
      }
    }
  }
`;

export default Home;
