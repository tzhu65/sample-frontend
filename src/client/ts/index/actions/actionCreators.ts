/**
 * Action creators
 */

import { Store } from "redux";

import { IUpdateLastClickedAction, UPDATE_LAST_CLICKED } from "./actions";

export function updateLastClicked(time: string): IUpdateLastClickedAction {
  return {
    time: time,
    type: UPDATE_LAST_CLICKED,
  };
}
