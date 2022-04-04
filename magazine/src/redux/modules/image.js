import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { storage } from "../../shared/firebase";
//action
const UPLOADING = "Uploading";
const UPLOAD_IMAGE = "UploadImage";
const SET_PREVIEW = "Set_Preview";

//actioncreators
const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({ image_url }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));

const initialState = {
  image_url: "",
  uploading: false,
  preview: null,
};

//middlewares
const uploadImageFB = (image) => {
  return function (dispatch, getState, { history }) {
    dispatch(uploading(true));
    const _upload = storage.ref(`images/${image.name}`).put(image);

    _upload.then((snapshot) => {
      snapshot.ref.getDownloadURL().then((url) => {
        dispatch(uploadImage(url));
      });
    });
  };
};

//reducer
export default handleActions(
  {
    [UPLOAD_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.image_url = action.payload.image_url;
        draft.uploading = false;
      }),
    [UPLOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.uploading = action.payload.uploading;
      }),
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
  },
  initialState
);

export { uploadImageFB, setPreview };
