import { contactManagementMockAPI } from "./contactManagement/mock";

const mockAPI = {
  contactManagement: contactManagementMockAPI,
};

const appAPI = {
  contactManagement: contactManagementMockAPI,
};

const IS_MOCK = true;

export const API = IS_MOCK ? mockAPI : appAPI;
