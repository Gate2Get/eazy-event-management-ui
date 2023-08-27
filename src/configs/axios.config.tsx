import axios, { type AxiosInstance } from "axios";
// import { API_ERROR } from '../localization/en';

export const instance: AxiosInstance = axios.create();

const snackbarAllowedMethods = ["post", "put", "delete"];

/**
 * Catch the unAuthorized Request
 */
export const interceptors = (navigate: (url: string) => void): void => {
  instance.interceptors.response.use(
    (response) => {
      const { data, config } = response;
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        window.location.replace("/api/login");
      } else if (error?.response?.status === 403) {
        navigate(
          window.location.pathname.includes("/settings")
            ? "/settings/forbidden"
            : "/forbidden"
        );
      } else if (error?.response?.status === 404) {
        navigate("/404");
      } else if (error?.response?.status === 412) {
        navigate(
          window.location.pathname.includes("/settings")
            ? "/settings/no-active-cycle"
            : "/no-active-cycle"
        );
      }
    }
  );
};

export const contactManagementEndpoint = {
  createContactDirectory: "/api/v1/contact/directory",
  getContactDirectory: "/api/v1/contact/directory",
  updateContactDirectory: "/api/v1/contact/directory",
  deleteContactDirectory: "/api/v1/contact/directory/",
  getContactList: "/api/v1/contact/",
};

export const userManagementEndpoint = {
  loginUser: "/api/v1/login",
  verifyOTP: "/api/v1/verify-otp",
  getUserInfo: "/api/v1/user/info",
  updateUserInfo: "/api/v1/user/info",
};
