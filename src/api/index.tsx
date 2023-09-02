import { contactManagementAPI } from "./contactManagement";
import { contactManagementMockAPI } from "./contactManagement/mock";
import { templateManagementAPI } from "./templateManagement";
import { userManagementAPI } from "./userManagement";

const mockAPI = {
  contactManagement: contactManagementMockAPI,
};

const appAPI = {
  contactManagement: contactManagementAPI,
  userManagement: userManagementAPI,
  templateManagement: templateManagementAPI,
};

const IS_MOCK = true;

// export const API = IS_MOCK ? mockAPI : appAPI;
export const API = appAPI;
