import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import "moment";
import moment from "moment";

//action
const SETPOST = "SET_POST";
const ADDPOST = "ADD_POST";

//action creator
const setPost = createAction(SETPOST, (post_list) => ({ post_list }));
const addPost = createAction(ADDPOST, (post) => ({ post }));

const init = {
  list: [],
};
const initialPost = {
  image_url:
    "https://firebasestorage.googleapis.com/v0/b/sparta-megazine.appspot.com/o/images%2FG8lqlujLSLNe3Gy1XQbxNk83kNA2_1648774297180?alt=media&token=e56ec9eb-1eeb-416c-a599-5baba44019c2",
  contents: "",
  comment_cnt: 0,
  insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
};

//middlewares
const addPostFB = (contents = "") => {
  return function (dispatch, getState, { history }) {
    console.log("안녕", contents);
    const postDB = firestore.collection("post");
    const _user = getState().user.user;
    const user_info = {
      user_name: _user.name,
      user_id: _user.uid,
      user_profile: _user.user_profile,
    };
    const _post = {
      ...initialPost,
      contents: contents,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };
    //
    postDB
      .add({ ...user_info, ..._post })
      .then((doc) => {
        let post = { user_info, ..._post, id: doc.id };
        dispatch(addPost(post));
      })
      .catch((error) => {
        console.log("post 작성에 실패했습니다.", error);
      });
    history.replace("/");
  };
};

const getPostFB = () => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");
    postDB.get().then((docs) => {
      let post_list = [];
      docs.forEach((doc) => {
        let _post = {
          id: doc.id,
          ...doc.data(),
        };
        let post = {
          id: doc.id,
          user_info: {
            name: _post.user_name,
            user_profile: _post.user_profile,
            user_id: _post.user_id,
          },
          image_url: _post.image_url,
          contents: _post.contents,
          comment_cnt: _post.comment_cnt,
          insert_dt: _post.insert_dt,
        };
        post_list.push(post);
      });
      dispatch(setPost(post_list));
    });
  };
};

//reducer
export default handleActions(
  {
    [SETPOST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
      }),
    [ADDPOST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
  },
  init
);

const actionCreators = {
  setPost,
  addPost,
  getPostFB,
  addPostFB,
};

export { actionCreators };
