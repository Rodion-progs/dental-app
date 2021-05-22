import Constants from "expo-constants";
const { manifest } = Constants;
const url = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(`:`).shift().concat(`:6666`)
  : `api.example.com`;

export default 'http://' + url
