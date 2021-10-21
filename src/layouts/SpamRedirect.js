import { useLocation } from "react-router-dom";

import queryString from "query-string";
import { setExpires } from "../helpers/functionals";
import { CLIENT_APP_URL } from "../helpers/spotifyUrls";

export default function SpotifyRedirect(props) {
  const location = useLocation();
  const readUserState = {
    ...queryString.parse(location.hash),
  };

  // console.log(readUserState);

  if (!readUserState.hasOwnProperty("access_token")) {
    // console.log("not allowed");
  } else {
    readUserState.expires_in = setExpires(Number(readUserState.expires_in));

    Object.keys(readUserState).map(function (key, index) {
      localStorage.setItem(key, readUserState[key]);
      return;
    });
  }

  return (window.location = CLIENT_APP_URL);
  return "redirect";
}
