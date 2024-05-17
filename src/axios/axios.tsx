import axios from "axios";
import { API_URL } from "../utils/constants";

export const customAxios = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  })