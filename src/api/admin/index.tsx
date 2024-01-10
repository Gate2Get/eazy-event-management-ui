import { adminEndpoint, instance } from "../../configs/axios.config";
import {
  ContactListType,
  DateFilterType,
  EventFilterType,
  TemplateAdminType,
  TemplateType,
  UserInfoType,
  WalletType,
} from "../../types";

export const adminAPI = {
  adminTemplateAction: async (payload: TemplateAdminType) => {
    return await instance
      .put(adminEndpoint.adminTemplateAction, payload)
      .then((response) => {
        return true;
      })
      .catch((error) => {
        throw error;
      });
  },
  getTemplates: async (
    filters: EventFilterType = {}
  ): Promise<TemplateType[]> => {
    return await instance
      .get(adminEndpoint.getTemplates, { params: filters })
      .then((response) => {
        const result = response.data.result;
        return result;
      })
      .catch((error) => {
        throw error;
      });
  },
  getEventContacts: async (id: string): Promise<ContactListType[]> => {
    return await instance
      .get(`${adminEndpoint.getContacts}/${id}/contacts`)
      .then((response) => {
        const result = response.data.result;
        return result;
      })
      .catch((error) => {
        throw error;
      });
  },
  getEventTemplate: async (id: string): Promise<TemplateType> => {
    return await instance
      .get(`${adminEndpoint.getTemplate}/${id}/template`)
      .then((response) => {
        const result = response.data.result;
        return result;
      })
      .catch((error) => {
        throw error;
      });
  },
  getUser: async (id: string): Promise<UserInfoType> => {
    return await instance
      .get(`${adminEndpoint.getUser}/${id}`)
      .then((response) => {
        const result = response.data.result;
        return result;
      })
      .catch((error) => {
        throw error;
      });
  },

  getAllUsers: async (search: string): Promise<UserInfoType[]> => {
    return await instance
      .get(adminEndpoint.getAllUsers, {
        params: {
          search,
        },
      })
      .then((response) => {
        const result = response.data.result;
        return result;
      })
      .catch((error) => {
        throw error;
      });
  },

  updateWallet: async (payload: WalletType) => {
    return await instance
      .post(adminEndpoint.updateWallet, payload)
      .then((response) => {
        return response.data.status;
      })
      .catch((error) => {
        throw error;
      });
  },

  getWalletTransaction: async (
    filter: DateFilterType,
    offset: number,
    limit: number
  ): Promise<WalletType[]> => {
    return await instance
      .get(adminEndpoint.getWalletTransaction, {
        params: {
          ...filter,
          offset,
          limit,
        },
      })
      .then((response) => {
        const result = response.data.result;
        return result;
      })
      .catch((error) => {
        throw error;
      });
  },
};
