import GetLocation from 'react-native-get-location';
import CameraRoll from '@react-native-community/cameraroll';
import { launchCamera } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';

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

export const takePicture = () => async dispatch => {
  const options = {
    mediaType: 'photo',
    maxWidth: 8000,
    maxHeight: 8000,
    includeExtra: true,
    //saveToPhotos: true,
    storageOptions: {
      skipBackup: true,
    },
  };
  dispatch({ type: TAKE_PICTURE_REQUEST });

  const result = await launchCamera(options); //promise
  const { assets, didCancel, errorCode, errorMessage } = result;

  if (assets) {
    const photo = {};
    Object.assign(photo, ...assets); // copy assets object to photo obj

    const location = await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    });
    if (location) {
      const { longitude, latitude } = location;
      /*Creating new object inside photo if no exif & Adding the GPS data to the photo. */
      photo.exif = {};
      photo.exif['{GPS}'] = {
        Longitude: longitude,
        Latitude: latitude,
      };
      const localIdentifier = await CameraRoll.save(photo?.uri); //return new localIndetifier

      photo.localIdentifier = localIdentifier;
      dispatch({
        type: TAKE_PICTURE_SUCCESS,
        payload: photo,
      });
    }
  }
  if (didCancel) {
    dispatch({
      type: TAKE_PICTURE_CANCELLED,
      payload: "message: 'did cancel on taking photo",
    });
  } else if (errorCode) {
    dispatch({
      type: TAKE_PICTURE_ERROR,
      payload: {
        code: errorCode,
        message: errorMessage,
      },
    });
  }
};

export const openGallery = () => async dispatch => {
  //  promise
  dispatch({
    type: OPEN_GALLERY_REQUEST,
  });
  ImagePicker.openPicker({
    width: 300,
    height: 300,
    cropping: false,
    multiple: true,
    includeExif: true,
    mediaType: 'photo',
    maxFiles: 10,
  })
    .then(image => {
      dispatch({
        type: OPEN_GALLERY_SUCCESS,
        payload: image,
      });
    })
    .catch(err => {
      dispatch({
        type: OPEN_GALLERY_ERROR,
        payload: err.message,
      });
    });
};

export const deleteImage = item => async (dispatch, getState) => {
  dispatch({
    type: DELETE_IMAGE_REQUEST,
  });
  const imagesReducer = getState().imagesReducer;
  const { images } = imagesReducer;

  CameraRoll.deletePhotos([`${item.localIdentifier}`]) //Promise
    .then(() => {
      const filteredImages = images?.filter(
        img => img.localIdentifier !== item.localIdentifier,
      ); //filter deleted images

      dispatch({
        type: DELETE_IMAGE_SUCCESS,
        payload: filteredImages,
      });
    })
    .catch(err => {
      dispatch({
        type: DELETE_IMAGE_FAILED,
        payload: err,
      });
    });
};
