import { Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import { ROUTES_URL } from "../constants";
import { useBearStore } from "../store";
import "./styles.scss";

const { Text } = Typography;

export const Authorizer = () => {
  const { setLoading } = useBearStore.appStore();
  const navigate = useNavigate();

  React.useEffect(() => {
    verifyAuth();
  }, []);

  const verifyAuth = () => {
    setLoading(true);
    API.userManagement
      .verifyAuth()
      .then((isAuthenticated) => {
        setLoading(false);
        if (isAuthenticated) {
          navigate(`${ROUTES_URL.EE}/${ROUTES_URL.DASHBOARD}`);
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
