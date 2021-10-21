import { SET_ALBUMS, DEL_ALBUMS, SET_PAGES_ALBUMS } from "../actionTypes";
import { initCollectionState } from "../stateTypes";

function albumReducer(state = new initCollectionState(), action) {
  switch (action.type) {
    case SET_ALBUMS:
      state.collection = action.payload;
      return state;
    case SET_PAGES_ALBUMS:
      state.nextPage = action.payload.next;
      state.prevPage = action.payload.previous;
      state.total = action.payload.total;
      return state;
    case DEL_ALBUMS:
      state = new initCollectionState();
      return state;
    default:
      return state;
  }
}

export default albumReducer;
