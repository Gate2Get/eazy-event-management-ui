import React from "react";
import { useNavigate } from "react-router-dom";
import { useBearStore } from "./store";
import { useWindowSize } from "./hooks/useWindowSize";
import { AppRoutes } from "./routes";
import { interceptors } from "./configs/axios.config";
import { HomeLayout } from "./homeLayout";
import { Helmet } from "react-helmet";
import { PrimeReactProvider } from "primereact/api";
import "./App.scss";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { message } from "antd";

function App(): React.ReactElement {
  const { width } = useWindowSize();
  const { setScreen, setCollapsed, currentPage, setSnackbar } =
    useBearStore.appStore();
  const [messageApi, contextHolder] = message.useMessage();

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
    interceptors(navigate, messageApi);
    setSnackbar(messageApi);
  }, []);

  return (
    <div style={{ width }}>
      {contextHolder}
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
      <PrimeReactProvider>
        <HomeLayout>
          <AppRoutes />
        </HomeLayout>
      </PrimeReactProvider>
    </div>
  );
}

export default App;
