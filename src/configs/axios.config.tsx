import axios, { AxiosError, type AxiosInstance, HttpStatusCode } from "axios";
import { message, notification } from "antd";
import { ROUTES_URL } from "../constants";
import { MessageInstance } from "antd/es/message/interface";

export const instance: AxiosInstance = axios.create();

const snackbarAllowedMethods = ["post", "put", "delete"];

/**
 * Catch the unAuthorized Request
 */
export const interceptors = (
  navigate: (url: string) => void,
  messageApi: MessageInstance
): void => {
  instance.interceptors.request.use(
    function (config) {
      // Do something before request is sent

      const { method, url } = config;
      if (snackbarAllowedMethods.includes(method as string)) {
        messageApi.open({
          key: `${method}-${url}`,
          type: "loading",
          content: "Loading...",
        });
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      const { data, config, status } = response;
      const { url, method } = config;

      if (snackbarAllowedMethods.includes(method as string)) {
        // toast.current?.show({
        //   severity: "success",
        //   detail: data?.message || "Operation completed successfully",
        //   life: 3000,
        // });
        messageApi.open({
          key: `${method}-${url}`,
          type: "success",
          content: data?.message || "Operation completed successfully",
          duration: 5,
        });
        // notification.success({
        //   message: data?.message || "Operation completed successfully",
        //   className: "eazy__event-snackbar success",
        // });
      }
      return response;
    },
    (error: AxiosError) => {
      const { config, response } = error;
      const method = config?.method;
      const url = config?.url;

      if (error?.response?.status === HttpStatusCode.Unauthorized) {
        navigate(ROUTES_URL.LOGIN);
      } else if (error?.response?.status === HttpStatusCode.Forbidden) {
        navigate(`/${ROUTES_URL.FORBIDDEN}`);
      } else if (error?.response?.status === HttpStatusCode.NotFound) {
        navigate("/404");
      } else if (
        error?.response?.status === HttpStatusCode.BadRequest ||
        error?.response?.status === HttpStatusCode.ExpectationFailed
      ) {
        console.log({ error });
        // notification.success({
        //   message: error?.response?.data?.message || "Something went wrong!",
        //   className: "eazy__event-snackbar success",
        // });
        // toast.current?.show({
        //   severity: "error",
        //   detail: error?.response?.data?.message || "Something went wrong!",
        //   life: 3000,
        // });
        const data: any = response?.data;
        messageApi.open({
          key: `${method}-${url}`,
          type: "error",
          content: data?.message || "Something went wrong!",
          duration: 5,
        });
      }
    }
  );
};

export const contactManagementEndpoint = {
  createContactDirectory: "/api/v1/app/contact/directory",
  getContactDirectory: "/api/v1/app/contact/directory",
  updateContactDirectory: "/api/v1/app/contact/directory",
  deleteContactDirectory: "/api/v1/app/contact/directory/",
  getContactList: "/api/v1/app/contact/",
};

export const templateManagementEndpoint = {
  createTemplate: "/api/v1/app/message/template",
  reAppealTemplate: "/api/v1/app/message/template/re-appeal",
  getTemplate: "/api/v1/app/message",
  getTemplateById: "/api/v1/app/message/template/",
  updateTemplate: "/api/v1/app/message/template",
  deleteTemplate: "/api/v1/app/message/template/",
};

export const userManagementEndpoint = {
  loginEmailUser: "/api/v1/app/auth/login-email",
  loginGoogleUser: "/api/v1/app/auth/google",
  verifyEmailOTP: "/api/v1/app/auth/verify-email-otp",
  verifyOTP: "/api/v1/app/user/verify-otp",
  getUserSession: "/api/v1/app/user/session",
  deleteUserSession: "/api/v1/app/user/session",
  verifyAuth: "/api/v1/app/auth/verify-auth",
  getUserInfo: "/api/v1/app/user/info",
  getWalletTransaction: "/api/v1/app/user/wallet-transaction",
  generatePaymentLink: "/api/v1/app/user/generate-payment-link",
  getActiveUserPricingPlan: "/api/v1/app/plan/active",
  requestOtp: "/api/v1/app/user/request-otp",
  updateUserInfo: "/api/v1/app/user/info",
  logout: "/api/v1/app/auth/logout",
  getServiceTransactionLogs: "/api/v1/app/service-transaction/logs",
};

export const eventManagementEndpoint = {
  createEvent: "/api/v1/app/event/my-events",
  getEvent: "/api/v1/app/event/my-events",
  updateEvent: "/api/v1/app/event/my-events",
  deleteEvent: "/api/v1/app/event/my-events/",
  getEventContact: "/api/v1/app/event",
  updateEventContact: "/api/v1/app/event",
  getEventNotificationContact: "/api/v1/app/event",
  getEventNotificationTemplate: "/api/v1/app/event",
  exportContact: "/api/v1/app/contact/export/",
  getMyInvitation: "/api/v1/app/event/my-invitation",
  addEventAlbum: "/api/v1/app/event/media/album",
  updateEventAlbum: "/api/v1/app/event/media/album",
  deleteEventAlbum: "/api/v1/app/event/media/album",
  getEventAlbum: "/api/v1/app/event/media/album",
  getEventInvitationAlbum: "/api/v1/app/event/media/album",
  sendNotificationToOrganiser: "/api/v1/service/user/send-notification-me",
};

export const dashboardEndpoint = {
  getRecentEventNotification: "/api/v1/app/event/recent-event-notification",
  getEventStatistics: "/api/v1/app/event/statistic",
};

export const commonEndpoint = {
  getAlerts: "/api/v1/app/common/alerts",
  createBug: "/api/v1/app/common/report-bug",
  contactUs: "/api/v1/app/common/contact-us",
  submitFeedback: "/api/v1/app/common/feedback",
  uploadFile: "/api/v1/app/file/upload-single",
  getDataByPinCode: "/api/v1/pincode/",
};

export const adminEndpoint = {
  getTemplates: "/api/v1/app/admin/templates",
  getUser: "/api/v1/app/admin/user",
  getAllUsers: "/api/v1/app/admin/users",
  getContacts: "/api/v1/app/admin/event",
  getTemplate: "/api/v1/app/admin/event",
  adminTemplateAction: "/api/v1/app/admin/template/action",
  updateWallet: "/api/v1/app/admin/wallet-transaction",
  getWalletTransaction: "/api/v1/app/admin/wallet-transaction",
};
