const SET_ERROR = "SET_ERROR";
const SET_MSG = "SET_MSG";
const SET_HAS_UPDATES = "SET_HAS_UPDATES";
const OPEN_DRAWER = "OPEN_DRAWER";

export interface appState {
  msg?: string;
  error?: Error | string;
  drawerOpened: boolean;
  hasUpdates: boolean;
}

const initialState: appState = {
  error: undefined,
  drawerOpened: false,
  hasUpdates: false
};

export const appReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        error: action.error
      };
    case SET_MSG:
      return {
        ...state,
        msg: action.msg
      };
    case SET_HAS_UPDATES:
      return {
        ...state,
        hasUpdates: action.hasUpdates
      };
    case OPEN_DRAWER:
      return {
        ...state,
        drawerOpened: action.open
      };
    default:
      return state;
  }
};

export default appReducer;

export const setError = (error?: Error | string) => {
  console.error(error);
  return (dispatch: any) => {
    dispatch({ type: SET_ERROR, error });
  };
};
export const setMsg = (msg?: string) => {
  return (dispatch: any) => {
    dispatch({ type: SET_MSG, msg });
  };
};

export const setHasUpdates = (hasUpdates: boolean = true) => {
  return (dispatch: any) => {
    dispatch({ type: SET_HAS_UPDATES, hasUpdates });
  };
};

export const openDrawer = (open: boolean = true) => {
  return (dispatch: any) => {
    dispatch({ type: OPEN_DRAWER, open });
  };
};
