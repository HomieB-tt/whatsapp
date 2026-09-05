/**
 * React Native entrypoint.
 *
 * Keeping one platform-neutral entrypoint lets the Metro bundler and both
 * native hosts share the same application registration.
 */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
