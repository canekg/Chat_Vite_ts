import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { Provider } from "react-redux";
import { Provider as RollbarProvider, ErrorBoundary } from "@rollbar/react";
import App from "./Components/App.tsx";
import resources from "./locales/index.ts";
import AuthProvider from "./context/AuthProvider.tsx";
import SocketProvider from "./context/SocketProvider.tsx";
import store from "./slices/index.ts";
import rollbarConfig from "./rollbarConfig.ts";
import FilterProvider from "./context/FilterProvider.tsx";

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: "ru",
  });

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <AuthProvider>
            <SocketProvider>
              <FilterProvider>
              <I18nextProvider i18n={i18n}>
                <App />
              </I18nextProvider>
              </FilterProvider>
            </SocketProvider>
          </AuthProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};
export default init;
