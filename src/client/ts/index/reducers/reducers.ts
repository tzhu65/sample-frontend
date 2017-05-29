/**
 * Reducer
 */
import { UPDATE_LAST_CLICKED, IUpdateLastClickedAction } from "../actions/actions";

const initialState = {
  time: Date.now().toString(),
};

export function app(state = initialState, action: any) {
  switch (action.type) {
    case UPDATE_LAST_CLICKED:
      return {time: action.time}
    default: {
      return state;
    }
  }
}
