import { Typography } from "antd";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { API } from "../api";
import { NON_PROTECTED_ROUTES, ROUTES_URL } from "../constants";
import { useBearStore } from "../store";
import AuthenticationAnimation from "../assets/svg/authenticating-animate.svg";
import "./styles.scss";

const { Text } = Typography;

export const Authorizer = () => {
  const { setLoading, screen } = useBearStore.appStore();
  const { setIsAuthorized, setIsContactToken } = useBearStore.userStore();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    if (!NON_PROTECTED_ROUTES.includes(window.location.pathname)) {
      verifyAuth();
    }
  }, []);

  const verifyAuth = () => {
    setLoading(true);
    API.userManagement
      .verifyAuth()
      .then((response) => {
        setLoading(false);
        const { isAuthenticated, isContactToken } = response;
        setIsAuthorized(isAuthenticated);
        setIsContactToken(isContactToken);
        if (isAuthenticated) {
          const url = searchParams.get("returnTo")
            ? atob(searchParams.get("returnTo") as string)
            : `${ROUTES_URL.EE}/${ROUTES_URL.DASHBOARD}`;
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
      <div>
        <img
          loading="lazy"
          src={AuthenticationAnimation}
          alt=""
          width={screen === "MOBILE" ? "80%" : "35%"}
        />
      </div>
    </div>
  );
};
