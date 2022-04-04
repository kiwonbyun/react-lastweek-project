import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore, storage } from "../../shared/firebase";
import "moment";
import moment from "moment";
import { setPreview } from "./image";

//action
const SETPOST = "SET_POST";
const ADDPOST = "ADD_POST";
const LOADING = "Loading";

//action creator
const setPost = createAction(SETPOST, (post_list, paging) => ({
  post_list,
  paging,
}));
const addPost = createAction(ADDPOST, (post) => ({ post }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const init = {
  list: [],
  paging: { start: null, next: null, size: 3 },
  is_loading: false,
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
    const _image = getState().image.preview;
    const _upload = storage
      .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
      .putString(_image, "data_url");

    _upload.then((snapshot) => {
      snapshot.ref
        .getDownloadURL()
        .then((url) => {
          console.log(url);

          return url;
        })
        .then((url) => {
          postDB
            .add({ ...user_info, ..._post, image_url: url })
            .then((doc) => {
              let post = { user_info, ..._post, id: doc.id, image_url: url };
              dispatch(addPost(post));
              dispatch(setPreview(null));
              history.replace("/");
            })
            .catch((error) => {
              console.log("post 작성에 실패했습니다.", error);
            });
        })
        .catch((error) => {
          console.log("앗! 이미지업로드 이상", error);
        });
    });
    //
  };
};

const getPostFB = (start = null, size = 3) => {
  return function (dispatch, getState, { history }) {
    let _paging = getState().post.paging;
    if (_paging.start && !_paging.next) {
      return;
    }

    dispatch(loading(true));
    const postDB = firestore.collection("post");

    let query = postDB.orderBy("insert_dt", "desc");

    if (start) {
      query = query.startAt(start);
    }

    query
      .limit(size + 1)
      .get()
      .then((docs) => {
        let post_list = [];

        let paging = {
          start: docs.docs[0],
          next:
            docs.docs.length === size + 1
              ? docs.docs[docs.docs.length - 1]
              : null,
          size: size,
        };

        docs.forEach((doc) => {
          let _post = {
            id: doc.id,
            ...doc.data(),
          };
          let post = {
            id: doc.id,
            user_info: {
              user_name: _post.user_name,
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
        post_list.pop();
        dispatch(setPost(post_list, paging));
      });
    return;
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
            user_name: _post.user_name,
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
        draft.list.push(...action.payload.post_list);
        draft.paging = action.payload.paging;
        draft.is_loading = false;
      }),
    [ADDPOST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
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
