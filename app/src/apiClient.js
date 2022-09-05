import axios from "axios";
const app_id = "6316595bbd6f6a98f34b3d9c";
export default axios.create({
  baseURL: "https://dummyapi.io/data/v1/",
  headers: {
    "app-id": app_id,
  },
});
