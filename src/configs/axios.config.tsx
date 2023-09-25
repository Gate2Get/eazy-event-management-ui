import axios, { type AxiosInstance } from "axios";
import { message, notification } from "antd";

export const instance: AxiosInstance = axios.create();

const snackbarAllowedMethods = ["post", "put", "delete"];

/**
 * Catch the unAuthorized Request
 */
export const interceptors = (navigate: (url: string) => void): void => {
  instance.interceptors.response.use(
    (response) => {
      const { data, config, status } = response;
      if (status === 201) {
        notification.success({
          message: data.message,
          className: "eazy__event-snackbar success",
        });
      }
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        navigate("/login");
      } else if (error?.response?.status === 403) {
        navigate(
          window.location.pathname.includes("/settings")
            ? "/settings/forbidden"
            : "/forbidden"
        );
      } else if (error?.response?.status === 404) {
        navigate("/404");
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

export const templateManagementEndpoint = {
  createTemplate: "/api/v1/message/template",
  getTemplate: "/api/v1/message/template",
  getTemplateById: "/api/v1/message/template/",
  updateTemplate: "/api/v1/message/template",
  deleteTemplate: "/api/v1/message/template/",
};

export const userManagementEndpoint = {
  loginUser: "/api/v1/login",
  verifyOTP: "/api/v1/verify-otp",
  getUserInfo: "/api/v1/user/info",
  updateUserInfo: "/api/v1/user/info",
};

export const eventManagementEndpoint = {
  createEvent: "api/v1/event/my-events",
  getEvent: "/api/v1/event/my-events",
  updateEvent: "/api/v1/event/my-events",
  deleteEvent: "/api/v1/event/my-events/",
  getEventContact: "/api/v1/event",
};

export const dashboardEndpoint = {
  getRecentEvent: "/api/v1/event/recent-event",
};

export const commonEndpoint = {
  getAlerts: "/api/v1/common/alerts",
  createBug: "/api/v1/common/report-bug",
};
