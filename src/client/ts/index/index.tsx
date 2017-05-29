/**
 * index.tsx
 *
 * Main entry point for bootstrapping and loading the app.
 */

/**
 * Load necessary client libraries
 */
import * as Cookies from "js-cookie";
import * as React from "react";
import * as ReactDOM from "react-dom";
require("redux");
require("react-relay");
require("socket.io-client");

/**
 * Bootstrap files
 */
import "./actions/actionCreators";
import "./actions/actions";
import "./constants/constants";
import "./reducers/reducers";
import "./stores/store";

/**
 * Load the main react component
 */
import { Main } from "./containers/Main";

ReactDOM.render(
  <Main />,
  document.getElementById("main"),
);

/**
 * Initialization
 */
// $(document).ready(() => {
//   console.log("hey");
// });
