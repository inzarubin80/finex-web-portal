import {
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_LOGOUT,
  CONFIRMATION_CODE_REQUEST,
  CONFIRMATION_CODE_FAILURE,
  CONFIRMATION_CODE_SUCCESS,
  CLEAR_ERROR,
  CANCEL_CONFIRMATION,

  SET_PASSWORD_REQUEST,
  SET_PASSWORD_SUCCESS,
  SET_PASSWORD_FAILURE


} from '../types'

import { executorRequests, sendConformationCode, getAccessKey, passwordChange } from '../../api/dataService1c';
import { v4 as uuidv4 } from 'uuid';

const setLoginSuccess = (loginData) => {
  return {
    type: LOGIN_SUCCESS
  };
};

export const cancelConformation = () => {
  return {
    type: CANCEL_CONFIRMATION
  };
};




const setLoginRequest = () => {
  return {
    type: LOGIN_REQUEST
  };
};

const setLoginFailure = (err) => {

  return {
    type: LOGIN_FAILURE,
    payload: err,
  };
};


export const logOut = (loginData) => {
  localStorage.removeItem('key')
  return {
    type: LOGIN_LOGOUT
  };
};

export const сlearError = () => {
  return {
    type: CLEAR_ERROR
  };
}


export const login = (email,password, cb) => {


  return (dispatch, getState) => {


    const state = getState()


    dispatch(setLoginRequest());

    const functionRequest = () => {
      return getAccessKey(email, password);
    };

    const responseHandlingFunction = (json) => {

      if (json.error) {
        dispatch(setLoginFailure(json.error));
      } else {

        dispatch(setLoginSuccess());
        localStorage.setItem('key', json.key)
        localStorage.setItem('userID', state.user.userID)

        cb();

      }
    }

    const exceptionHandlingFunction = (error) => {
      dispatch(setLoginFailure(error));
    };

    executorRequests(functionRequest, responseHandlingFunction, exceptionHandlingFunction, dispatch);

  };
}

////////////////////////////////////////////////////////////////////
const setPasswordRequest = () => {
  return {
    type: SET_PASSWORD_REQUEST
  };
}

const setPasswordFailure = (err) => {
  return {
    type: SET_PASSWORD_FAILURE,
    payload: err
  };
}

const setPasswordSuccess = () => {
  return {
    type: SET_PASSWORD_SUCCESS
  };
}

export const setPassword = (passwordСhangeKey, password, cb) => {

  return (dispatch) => {

    dispatch(setPasswordRequest())

    const functionRequest = () => {
      return passwordChange(passwordСhangeKey, password);
    };

    const responseHandlingFunction = (json) => {

      if (json.error) {
        dispatch(setPasswordFailure(json.error));
      } else {

        dispatch(setPasswordSuccess());
        localStorage.setItem('userID', json.userID)
        cb();

      }
    }

    const exceptionHandlingFunction = (error) => {
      dispatch(setPasswordFailure(error));
    };

    executorRequests(functionRequest, responseHandlingFunction, exceptionHandlingFunction, dispatch);

  }

}
