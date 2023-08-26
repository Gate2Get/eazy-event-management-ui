import { contactManagementMockAPI } from "./contactManagement/mock";
import { userManagementAPI } from "./userManagement";

const mockAPI = {
  contactManagement: contactManagementMockAPI,
};

const appAPI = {
  contactManagement: contactManagementMockAPI,
  userManagement: userManagementAPI,
};

const IS_MOCK = true;

// export const API = IS_MOCK ? mockAPI : appAPI;
export const API = appAPI;
