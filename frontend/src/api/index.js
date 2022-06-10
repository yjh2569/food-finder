import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.withCredentials = true;
export const request = (method, url, data) => {
  axios.defaults.headers["X-AUTH-TOKEN"] = Cookies.get("X-AUTH-TOKEN");
  return axios({
    method,
    url,
    data,
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
