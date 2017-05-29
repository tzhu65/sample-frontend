import { createStore } from "redux";
import { app } from "../reducers/reducers";
import { updateLastClicked } from '../actions/actionCreators'

const store = createStore(app);
console.log(store.getState());

let unsubscribe = store.subscribe(() => {
  console.log("before");
  console.log(store.getState());
  console.log("after");
});

store.dispatch( updateLastClicked(Date.now().toString()));
