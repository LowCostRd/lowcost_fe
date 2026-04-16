import axios from "axios";

export const api = axios.create({
  baseURL: "https://lowcost-be.onrender.com/v1/api",
  headers: {
    "Content-Type": "application/json",
  },
});
