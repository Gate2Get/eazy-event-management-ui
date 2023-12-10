import React from "react";
import { useNavigate } from "react-router-dom";
import { useBearStore } from "./store";
import { useWindowSize } from "./hooks/useWindowSize";
import { AppRoutes } from "./routes";
import { interceptors } from "./configs/axios.config";
import { HomeLayout } from "./homeLayout";
import { Helmet } from "react-helmet";
import "./App.scss";

function App(): React.ReactElement {
  const { width } = useWindowSize();
  const { setScreen, setCollapsed, currentPage } = useBearStore.appStore();

  const navigate = useNavigate();
  React.useEffect(() => {
    if (width < 650) {
      setScreen("MOBILE");
      setCollapsed(true);
    } else {
      setScreen("DESKTOP");
      setCollapsed(false);
    }
  }, [width]);

  React.useEffect(() => {
    interceptors(navigate);
  }, []);

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Eazy Event {currentPage && `| ${currentPage}`} </title>
        <link rel="canonical" href={window.location.href} />
        <meta name="author" content="Eazy Event" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=yes, minimum-scale=0.5, maximum-scale=2.0"
        />
      </Helmet>
      <HomeLayout>
        <AppRoutes />
      </HomeLayout>
    </div>
  );
}

export default App;
