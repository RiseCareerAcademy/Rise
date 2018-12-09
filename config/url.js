import Expo from "expo";
import { REACT_NATIVE_HOST } from 'react-native-dotenv';

const { manifest } = Expo.Constants;
export const HOST = __DEV__ ?
	`${manifest.debuggerHost.split(`:`)[0]}:8000` :
	REACT_NATIVE_HOST;
