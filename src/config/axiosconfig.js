import axios from "axios";

const instance = axios.create({
  baseURL:
    "http://develocity-blockchain-stagging-production-c0d0.up.railway.app/api/v1/", //live server
  // baseURL : 'http://20.218.124.106:1885/api/v1/',  //test server
  //   headers: {
  // //  Authorization: `<Your Auth Token>`,
  //     Content-Type: "application/json",
  //     timeout : 1000,
  //   },
});

export default instance;
