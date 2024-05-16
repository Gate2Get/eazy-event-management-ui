import { adminAPI } from "./admin";
import { commonAPI } from "./common";
import { contactManagementAPI } from "./contactManagement";
import { dashboardAPI } from "./dashboard";
import { eventManagementAPI } from "./eventManagement";
import { paymentAPI } from "./payment";
import { templateManagementAPI } from "./templateManagement";
import { userManagementAPI } from "./userManagement";

const appAPI = {
  contactManagement: contactManagementAPI,
  userManagement: userManagementAPI,
  templateManagement: templateManagementAPI,
  eventManagement: eventManagementAPI,
  dashboardAPI,
  commonAPI,
  adminAPI,
  paymentAPI,
};

const IS_MOCK = true;

// export const API = IS_MOCK ? mockAPI : appAPI;
export const API = appAPI;
