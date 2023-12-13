import { Provider } from "react-redux";
import { AppRouter } from "./router/AppRouter";
import { AppTheme } from "./theme";
import { store } from "./store";

export const JournalApp = () => {
  return (
    <>
      <AppTheme>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </AppTheme>
    </>
  );
};
