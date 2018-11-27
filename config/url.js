import Expo from "expo";

const { manifest } = Expo.Constants;
export const DOMAIN = process.env.NODE_ENV === 'development' ?
	`${manifest.debuggerHost.split(`:`)[0]}:8000` :
	process.env.DOMAIN_URL;
