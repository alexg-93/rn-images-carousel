import {
  TAKE_PICTURE_REQUEST,
  TAKE_PICTURE_SUCCESS,
  TAKE_PICTURE_ERROR,
  TAKE_PICTURE_CANCELLED,
  OPEN_GALLERY_REQUEST,
  OPEN_GALLERY_SUCCESS,
  OPEN_GALLERY_ERROR,
  DELETE_IMAGE_REQUEST,
  DELETE_IMAGE_SUCCESS,
  DELETE_IMAGE_FAILED,
} from '../constants';

const initialState = {
  images: [],
  error: null,
  didCancel: {
    canceled: false,
    message: '',
  },
};

export const imagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case TAKE_PICTURE_REQUEST:
      return { ...state };
    case TAKE_PICTURE_SUCCESS:
      return {
        ...state,
        images: [...state.images, action.payload],
      };
    case TAKE_PICTURE_CANCELLED:
      return {
        ...state,
        didCancel: {
          canceled: true,
          message: action.payload,
        },
      };
    case TAKE_PICTURE_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case OPEN_GALLERY_REQUEST:
      return { ...state };
    case OPEN_GALLERY_SUCCESS:
      return {
        ...state,
        images: [...state.images, ...action.payload],
      };
    case OPEN_GALLERY_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_IMAGE_REQUEST:
      return {
        ...state,
      };
    case DELETE_IMAGE_SUCCESS:
      return {
        ...state,
        images: [...action.payload].length > 0 ? [...action.payload] : [],
      };
    case DELETE_IMAGE_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
