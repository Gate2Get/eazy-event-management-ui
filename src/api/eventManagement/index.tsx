import { eventManagementEndpoint, instance } from "../../configs/axios.config";
import {
  ContactDirectoryType,
  ContactListType,
  EventFilterType,
  EventType,
} from "../../types";

export const eventManagementAPI = {
  createEvent: async (event: EventType) => {
    return await instance
      .post(eventManagementEndpoint.createEvent, event)
      .then((response) => {
        return true;
      })
      .catch((error) => {
        throw error;
      });
  },
  updateEvent: async (event: EventType) => {
    return await instance
      .put(eventManagementEndpoint.updateEvent, event)
      .then((response) => {
        return true;
      })
      .catch((error) => {
        throw error;
      });
  },
  deleteEvent: async (id: string) => {
    return await instance
      .delete(`${eventManagementEndpoint.deleteEvent}${id}`)
      .then((response) => {
        return true;
      })
      .catch((error) => {
        throw error;
      });
  },
  getEvent: async (filters: EventFilterType = {}): Promise<EventType[]> => {
    return await instance
      .get(eventManagementEndpoint.getEvent, { params: filters })
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
      .get(`${eventManagementEndpoint.getEventContact}/${id}/contacts`)
      .then((response) => {
        const result = response.data.result;
        return result;
      })
      .catch((error) => {
        throw error;
      });
  },
};
