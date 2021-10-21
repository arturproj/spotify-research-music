export class initCollectionState {
  constructor() {
    this.collection = [];
    this.nextPage = null;
    this.prevPage = null;
    this.total = 0;
  }
}

export class initUserState {
  constructor() {
    this.isAuthenticated = null;
    this.isExpired = null;
  }
}
