import { useLocation } from "react-router-dom";

import queryString from "query-string";
import { setExpires } from "../helpers/functionals";
import { CLIENT_APP_URL } from "../helpers/spotifyUrls";

export default function SpotifyRedirect(props) {
  /**
   *
   */
  const readUserState = {
    ...queryString.parse(useLocation().hash),
  };
  /**
   *
   */
  if (readUserState.hasOwnProperty("access_token")) {
    //
    readUserState.expires_in = setExpires(Number(readUserState.expires_in));
    //
    Object.keys(readUserState).map(function (key, index) {
      return localStorage.setItem(key, readUserState[key]);
    });
    /**
     *
     */
    return window.location.replace("/");
  } else {
    console.log("not allowed");
    /**
     *
     */
    return window.location.replace("/?error=401");
  }
}
