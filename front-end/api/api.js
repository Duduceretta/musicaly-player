import axios from "axios";
// import "dotenv/config";

// const { NODE_ENV } = process.env;
// const URL = NODE_ENV === "development" ? "http://localhost:5000/api" : "/api";

const URL = import.meta.env.DEV ? "http://localhost:5000/api" : "/api";

const artistsResponse = await axios.get(`${URL}/artists`);
const songsResponse = await axios.get(`${URL}/songs`);

export const artistArray = artistsResponse.data;
export const songsArray = songsResponse.data;
