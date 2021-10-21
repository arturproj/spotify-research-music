import { createStore, combineReducers } from "redux";

import {
  SET_USER_AUTHENTICATION,
  SET_USER_AUTH_EXPIRATION,
  DEL_USER_AUTHENTICATION,
  POP_USER_AUTHENTICATION,
  SET_ALBUMS,
  DEL_ALBUMS,
  SET_PLAYLISTS,
  DEL_PLAYLISTS,
  SET_ARTISTS,
  DEL_ARTISTS,
  SET_PAGES_ALBUMS,
  SET_PAGES_ARTISTS,
  SET_PAGES_PLAYLISTS,
} from "./reducers/actionTypes";

import userReducer from "./reducers/user";
import albumReducer from "./reducers/album";
import artistReducer from "./reducers/artist";
import playlistReducer from "./reducers/playlist";

export function userMapStateToProps(state) {
  return { user: state.userReducer };
}

export function userMapDispatchToProps(dispatch) {
  return {
    userAuthState: (payload) =>
      dispatch({ type: SET_USER_AUTHENTICATION, payload }),
    userExpires: (payload) =>
      dispatch({ type: SET_USER_AUTH_EXPIRATION, payload }),
    userUpdate: () => dispatch({ type: POP_USER_AUTHENTICATION }),
    userLogout: () => dispatch({ type: DEL_USER_AUTHENTICATION }),
  };
}

export function spotifyMapStateToProps(state) {
  return {
    artists: state.artistReducer,
    albums: state.albumReducer,
    playlists: state.playlistReducer,
  };
}

export function spotifyMapDispatchToProps(dispatch) {
  return {
    setArtists: (artists) => {
      dispatch({ type: SET_ARTISTS, payload: artists.items });
      dispatch({
        type: SET_PAGES_ARTISTS,
        payload: {
          previous: artists.previous,
          next: artists.next,
          total: artists.total,
        },
      });
    },
    setAlbums: (albums) => {
      dispatch({ type: SET_ALBUMS, payload: albums.items });
      dispatch({
        type: SET_PAGES_ALBUMS,
        payload: {
          previous: albums.previous,
          next: albums.next,
          total: albums.total,
        },
      });
    },
    setPlaylists: (playlists) => {
      dispatch({ type: SET_PLAYLISTS, payload: playlists.items });
      dispatch({
        type: SET_PAGES_PLAYLISTS,
        payload: {
          previous: playlists.previous,
          next: playlists.next,
          total: playlists.total,
        },
      });
    },
    resetCollections: () => {
      dispatch({ type: DEL_ALBUMS });
      dispatch({ type: DEL_PLAYLISTS });
      dispatch({ type: DEL_ARTISTS });
    },
  };
}

const rootReducer = combineReducers({
  userReducer,
  albumReducer,
  artistReducer,
  playlistReducer,
});

const store = createStore(rootReducer);

export default store;
