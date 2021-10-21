import {
  SET_PLAYLISTS,
  DEL_PLAYLISTS,
  SET_PAGES_PLAYLISTS,
} from "../actionTypes";
import { initCollectionState } from "../stateTypes";

function playlistReducer(state = new initCollectionState(), action) {
  switch (action.type) {
    case SET_PLAYLISTS:
      state.collection = action.payload;
      return state;
    case SET_PAGES_PLAYLISTS:
      state.nextPage = action.payload.next;
      state.prevPage = action.payload.previous;
      state.total = action.payload.total;
      return state;
    case DEL_PLAYLISTS:
      state = new initCollectionState();
      return state;
    default:
      return state;
  }
}

export default playlistReducer;
