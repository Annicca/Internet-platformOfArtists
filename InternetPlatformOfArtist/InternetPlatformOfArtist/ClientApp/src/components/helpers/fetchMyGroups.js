import axios from "axios";
import { getRequestConfig } from "./getRequestConfig";

export const fetchMyGroups = async (url, setGroups) => {
    const response = await axios.get(url, getRequestConfig());
      console.log(response.data);
    setGroups(response.data);
};