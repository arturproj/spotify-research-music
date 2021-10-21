import { SET_ARTISTS, DEL_ARTISTS, SET_PAGES_ARTISTS } from "../actionTypes";
import { initCollectionState } from "../stateTypes";

function artistReducer(state = new initCollectionState(), action) {
  switch (action.type) {
    case SET_ARTISTS:
      state.collection = action.payload;
      return state;
    case SET_PAGES_ARTISTS:
      state.nextPage = action.payload.next;
      state.prevPage = action.payload.previous;
      state.total = action.payload.total;
      return state;
    case DEL_ARTISTS:
      state = new initCollectionState();
      return state;
    default:
      return state;
  }
}

export default artistReducer;
