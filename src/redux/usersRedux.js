/* eslint-disable linebreak-style */
import axios from "axios";
import { API_URL } from "../config";

/* action name creator */
const reducerName = "users";
const createActionName = (name) => `app/${reducerName}/${name}`;

/* action types */
const ADD_USER = createActionName("ADD_USER");

const FETCH_START = createActionName("FETCH_START");
const FETCH_ERROR = createActionName("FETCH_ERROR");

/* action creators */
export const addUser = (payload) => ({ type: ADD_USER, payload });

export const fetchStarted = (payload) => ({ payload, type: FETCH_START });
export const fetchError = (payload) => ({ payload, type: FETCH_ERROR });

/* thunk creators */

export const addUserRequest = (userData) => async (dispatch) => {
  try {
    dispatch(fetchStarted());
    const res = await axios({
      method: "post",
      url: `${API_URL}/users`,
      data: userData,
    });
    if (!res.data.exists) dispatch(addUser(userData));
  } catch (err) {
    dispatch(fetchError(err));
  }
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: [...statePart.data, { ...action.payload }],
      };
    default:
      return statePart;
  }
};
