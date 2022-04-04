import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";
import firebase from "firebase/compat/app";
import { auth } from "../../shared/firebase";

//initialState
const init = {
  user: null,
  is_login: false,
};

//actions
const LOGOUT = "LOGOUT";
const GETUSER = "GETUSER";
const SETUSER = "SETUSER";

//action creators
const logOut = createAction(LOGOUT, (user) => ({ user }));
const getUser = createAction(GETUSER, (user) => ({ user }));
const setUser = createAction(SETUSER, (user) => ({ user }));

//middleware actions
const loginFB = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
      auth
        .signInWithEmailAndPassword(id, pwd)
        .then((user) => {
          dispatch(
            setUser({
              name: user.user.displayName,
              id: id,
              user_profile: "",
              uid: user.user.uid,
            })
          );
          history.push("/");
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;

          console.log(errorCode, errorMessage);
        });
    });
  };
};

const signupFB = (id, pwd, name) => {
  return function (dispatch, getState, { history }) {
    auth
      .createUserWithEmailAndPassword(id, pwd)
      .then((user) => {
        auth.currentUser
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            dispatch(
              setUser({
                name: name,
                id: id,
                user_profile: "",
                uid: user.user.uid,
              })
            );
            history.push("/");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode, errorMessage);
      });
  };
};

const loginCheckFB = () => {
  return function (dispatch, getState, { history }) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setUser({
            name: user.displayName,
            user_profile: "",
            id: user.id,
            uid: user.uid,
          })
        );
      } else {
        dispatch(logOut());
      }
    });
  };
};

const logoutFB = () => {
  return function (dispatch, getState, { history }) {
    auth.signOut().then(() => {
      dispatch(logOut());
      history.replace("/");
    });
  };
};

//reducer
export default handleActions(
  {
    [SETUSER]: (state, action) =>
      produce(state, (draft) => {
        setCookie("is_login", "success!");
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOGOUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("is_login");
        draft.user = null;
        draft.is_login = false;
      }),
    [GETUSER]: (state, action) => produce(state, (draft) => {}),
  },
  init
);

export { logOut, getUser, signupFB, loginFB, loginCheckFB, logoutFB };
