import { Typography } from "antd";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { API } from "../api";
import { NON_PROTECTED_ROUTES, ROUTES_URL } from "../constants";
import { useBearStore } from "../store";
import "./styles.scss";

const { Text } = Typography;

export const Authorizer = () => {
  const { setLoading } = useBearStore.appStore();
  const { setIsAuthorized } = useBearStore.userStore();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    console.log("window.location.pathname", window.location.pathname);
    if (!NON_PROTECTED_ROUTES.includes(window.location.pathname)) {
      verifyAuth();
    }
  }, []);

  const verifyAuth = () => {
    setLoading(true);
    API.userManagement
      .verifyAuth()
      .then((isAuthenticated) => {
        setLoading(false);
        setIsAuthorized(isAuthenticated);
        if (isAuthenticated) {
          const url =
            searchParams.get("returnTo") ||
            `${ROUTES_URL.EE}/${ROUTES_URL.DASHBOARD}`;
          console.log({ url });
          navigate(url);
        } else {
          navigate(ROUTES_URL.LOGIN);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log({ location: "verifyAuth", error });
      });
  };

  return (
    <div className="authorizer__container">
      <Text className="loading-text">
        <p>Loading, please wait...</p>
      </Text>
      <Text className="other-text">
        Bringing people together, one event at a time!
      </Text>
    </div>
  );
};
