import axios from "axios";
import { API_URL } from "../config";

/* selectors */
export const getAllTasks = ({ tasks }) => tasks.data;
export const getAllToDo = ({ tasks }) =>
  tasks.data.filter((task) => task.status === 1);
export const getTaskById = ({ tasks }, taskId) =>
  tasks.data.find((task) => task._id === taskId);
export const getIsLoading = ({ tasks }) => tasks.loading;

/* action name creator */
const reducerName = "tasks";
const createActionName = (name) => `app/${reducerName}/${name}`;
/* action types */

const ADD_TASK = createActionName("ADD_TASK");
const UPDATE_TASK = createActionName("UPDATE_TASK");

const FETCH_START = createActionName("FETCH_START");
const FETCH_SUCCESS = createActionName("FETCH_SUCCESS");
const FETCH_ERROR = createActionName("FETCH_ERROR");
const FETCH_END = createActionName("FETCH_END");

/* action creators */

export const addTask = (payload) => ({ type: ADD_TASK, payload });
export const updateTask = (payload) => ({ type: UPDATE_TASK, payload });

export const fetchStarted = (payload) => ({ payload, type: FETCH_START });
export const fetchSuccess = (payload) => ({ payload, type: FETCH_SUCCESS });
export const fetchError = (payload) => ({ payload, type: FETCH_ERROR });
export const fetchEnded = (payload) => ({ payload, type: FETCH_END });

/* thunk creators */

export const fetchAllTasks = () => {
  return (dispatch) => {
    dispatch(fetchStarted());

    axios
      .get(`${API_URL}/tasks`)
      .then((res) => {
        dispatch(fetchSuccess(res.data));
        dispatch(fetchEnded());
      })
      .catch((err) => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const addTaskRequest = (task, _id) => {
  return async (dispatch) => {
    dispatch(fetchStarted({ name: "ADD_AD" }));
    try {
      let res = await axios.task(`${API_URL}/tasks`, task, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(addTask(res.data));
      dispatch(fetchEnded());
    } catch (err) {
      dispatch(fetchError(err));
    }
  };
};

export const updateTaskRequest = (task, id) => async (dispatch) => {
  try {
    dispatch(fetchStarted());
    const res = await axios({
      method: "put",
      url: `${API_URL}/tasks/${id}`,
      data: task,
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch(updateTaskRequest(res.data));
    dispatch(fetchEnded());
  } catch (err) {
    dispatch(fetchError(err));
  }
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case UPDATE_TASK:
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
          success: true,
        },
        data: statePart.data.map((task) =>
          task._id === action.payload._id
            ? { ...task, ...action.payload }
            : task
        ),
      };
    case ADD_TASK:
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
          success: true,
        },
        data: [...statePart.data, { ...action.payload }],
      };
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
          success: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
          success: true,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
          success: false,
        },
      };
    }
    case FETCH_END:
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
          success: false,
        },
      };
    default:
      return statePart;
  }
};
