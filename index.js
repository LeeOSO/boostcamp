/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import ProgramList from "./app/ProgramList";
import App from "./app/App";
// import RootNavigator from "./app/Navigator";

AppRegistry.registerComponent(appName, () => App);
