/**
 * Action types and their associated payloads
 */

export const UPDATE_LAST_CLICKED = "UPDATE_LAST_CLICKED";
export interface IUpdateLastClickedAction {
  type: string;
  time: string; // Time as a timestamp
}
