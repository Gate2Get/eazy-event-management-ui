import {
  contactManagementEndpoint,
  instance,
} from "../../configs/axios.config";
import { ContactDirectoryType } from "../../types";

const apiTimer = 1000;

export const contactManagementAPI = {
  createContactDirectory: async (directory: ContactDirectoryType) => {
    return await instance
      .post(contactManagementEndpoint.createContactDirectory, directory)
      .then((response) => {
        return true;
      })
      .catch((error) => {
        throw error;
      });
  },
  updateContactDirectory: async (directory: ContactDirectoryType) => {
    return await instance
      .put(contactManagementEndpoint.updateContactDirectory, directory)
      .then((response) => {
        return true;
      })
      .catch((error) => {
        throw error;
      });
  },
  deleteContactDirectory: async (id: string) => {
    return await instance
      .delete(`${contactManagementEndpoint.deleteContactDirectory}${id}`)
      .then((response) => {
        return true;
      })
      .catch((error) => {
        throw error;
      });
  },
  getContactDirectory: async (filters = {}) => {
    return await instance
      .get(contactManagementEndpoint.getContactDirectory, { params: filters })
      .then((response) => {
        const result = response.data.result;
        return result;
      })
      .catch((error) => {
        throw error;
      });
  },
  getContactList: async (id: string) => {
    return await instance
      .get(`${contactManagementEndpoint.getContactList}${id}`)
      .then((response) => {
        const result = response.data.result;
        return result;
      })
      .catch((error) => {
        throw error;
      });
  },
};
