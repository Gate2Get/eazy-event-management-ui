import { adminEndpoint, instance } from "../../configs/axios.config";
import {
  ContactListType,
  EventAdminType,
  EventFilterType,
  EventType,
  TemplateType,
  UserInfoType,
} from "../../types";

export const adminAPI = {
  //   createEvent: async (event: EventType) => {
  //     return await instance
  //       .post(adminEndpoint.createEvent, event)
  //       .then((response) => {
  //         return true;
  //       })
  //       .catch((error) => {
  //         throw error;
  //       });
  //   },
  //   updateEvent: async (event: EventType) => {
  //     return await instance
  //       .put(adminEndpoint.updateEvent, event)
  //       .then((response) => {
  //         return true;
  //       })
  //       .catch((error) => {
  //         throw error;
  //       });
  //   },
  adminEventAction: async (payload: EventAdminType) => {
    return await instance
      .put(adminEndpoint.adminEventAction, payload)
      .then((response) => {
        return true;
      })
      .catch((error) => {
        throw error;
      });
  },
  getEvents: async (filters: EventFilterType = {}): Promise<EventType[]> => {
    return await instance
      .get(adminEndpoint.getEvents, { params: filters })
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
};
