import axios from "axios";

export default axios.create({
  baseURL:
    "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/forecast",
  params: {
    appid: "84ff0266a1c3e173c4a5f747258f2958"
  },
  headers: {
    "Content-Type": "application/json"
  }
});
