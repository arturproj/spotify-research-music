export function handleAuthRequirements() {
  return {
    access_token: localStorage.getItem("access_token"),
    expires_in: Number(localStorage.getItem("expires_in")),
    token_type: localStorage.getItem("token_type"),
  };
}

export function setExpires(expires_in) {
  return Date.now() + expires_in * 1000;
}

export function validateAuthenticated() {
  return handleAuthRequirements().access_token ? true : false;
}

export function validateExpired() {
  return handleAuthRequirements().expires_in + 3600 * 1000 <= Date.now();
}
