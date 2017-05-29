import * as React from "react";

import { FBLogin } from "../components/FBLogin";

/**
 * Main
 *
 * Container for the / page. Main purpose is to structure the layout of the page.
 */
class Main extends React.Component<undefined, undefined> {
  public render() {
    return (
      <div>
        <FBLogin link={"/auth"}/>

        <h1>Hello from the world!</h1>

      </div>
    );
  }
}

function loginFacebook(): undefined {
  return undefined;
}

export { Main };
