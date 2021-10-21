import axios from "axios";
import { handleAuthRequirements, validateExpired } from "./functionals";

export const setAuthHeader = () => {
  try {
    const auth = handleAuthRequirements();
    if (auth.access_token && !validateExpired()) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `${auth.token_type} ${auth.access_token}`;
    } else {
      console.log(
        "validate expired auth",
        auth.access_token,
        !validateExpired()
      );
      window.location = "/";
    }
  } catch (error) {
    console.log("Error setting auth", error);
  }
};

export async function get(url, params = {}) {
  setAuthHeader();
  const result = await axios.get(url, params);
  return result.data;
}

export async function post(url, params = {}) {
  setAuthHeader();
  const result = await axios.post(url, params);
  return result.data;
}

export async function getPagination(url) {
  setAuthHeader();
  const result = await axios.get(url);
  return result.data;
}

export const callCategories = (query) =>
  Promise.all([
    get(`https://api.spotify.com/v1/search?query=${query}&type=artist`),
    get(`https://api.spotify.com/v1/search?query=${query}&type=album`),
    get(`https://api.spotify.com/v1/search?query=${query}&type=playlist`),
  ]);
