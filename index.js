import { registerRootComponent } from "expo";

import App from "./App";
import { ModalPortal } from "react-native-modals";
import { AppContextProvider } from "./context/appContext";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

function Root() {
  return (
    <AppContextProvider>
      <App />
      <ModalPortal />
    </AppContextProvider>
  );
}
registerRootComponent(Root);
