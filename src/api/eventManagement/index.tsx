import { eventManagementEndpoint, instance } from "../../configs/axios.config";
import {
  AttachmentType,
  ContactListType,
  EventFilterType,
  EventType,
  MyInvitationType,
  TemplateType,
  VirtualLoadQueryType,
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
  getEventContact: async (eventId: string): Promise<ContactListType[]> => {
    return await instance
      .get(`${eventManagementEndpoint.getEventContact}/${eventId}/contacts`)
      .then((response) => {
        const result = response.data.result;
        return result;
      })
      .catch((error) => {
        throw error;
      });
  },
  updateEventContact: async (eventId: string, contacts: ContactListType[]) => {
    return await instance
      .put(
        `${eventManagementEndpoint.updateEventContact}/${eventId}/contacts`,
        {
          contacts,
        }
      )
      .then((response) => {
        return response.data.status;
      })
      .catch((error) => {
        throw error;
      });
  },
  updateEventNotificationContact: async (
    eventId: string,
    notificationId: string,
    contacts: ContactListType[]
  ): Promise<ContactListType[]> => {
    return await instance
      .put(
        `${eventManagementEndpoint.getEventNotificationContact}/${eventId}/notification/${notificationId}/contacts`,
        {
          contacts,
        }
      )
      .then((response) => {
        const result = response.data.result;
        return result;
      })
      .catch((error) => {
        throw error;
      });
  },
  getEventNotificationContact: async (
    eventId: string,
    notificationId: string
  ): Promise<ContactListType[]> => {
    return await instance
      .get(
        `${eventManagementEndpoint.getEventNotificationContact}/${eventId}/notification/${notificationId}/contacts`
      )
      .then((response) => {
        const result = response.data.result;
        return result;
      })
      .catch((error) => {
        throw error;
      });
  },
  getEventNotificationTemplate: async (
    eventId: string,
    notificationId: string
  ): Promise<TemplateType> => {
    return await instance
      .get(
        `${eventManagementEndpoint.getEventNotificationTemplate}/${eventId}/notification/${notificationId}/template`
      )
      .then((response) => {
        const result = response.data.result;
        return result;
      })
      .catch((error) => {
        throw error;
      });
  },
  getMyInvitation: async (
    filters: EventFilterType = {}
  ): Promise<MyInvitationType[] | MyInvitationType> => {
    return await instance
      .get(eventManagementEndpoint.getMyInvitation, { params: filters })
      .then((response) => {
        const result = response.data.result;
        if (filters.id) {
          return result?.[0] || {};
        }
        return result;
      })
      .catch((error) => {
        throw error;
      });
  },
  addEventAlbum: async (eventId: string, attachments: AttachmentType[]) => {
    return await instance
      .post(`${eventManagementEndpoint.addEventAlbum}/${eventId}/album`, {
        attachments,
      })
      .then((response) => {
        return response.data?.status;
      })
      .catch((error) => {
        throw error;
      });
  },
  getEventAlbum: async (
    eventId: string,
    filter: VirtualLoadQueryType
  ): Promise<AttachmentType[]> => {
    return await instance
      .get(`${eventManagementEndpoint.getEventAlbum}/${eventId}/album`, {
        params: filter,
      })
      .then((response) => {
        const result = response.data.result;
        return result;
      })
      .catch((error) => {
        throw error;
      });
  },
  deleteEventAlbum: async (
    eventId: string,
    id: string[]
  ): Promise<AttachmentType[]> => {
    return await instance
      .delete(`${eventManagementEndpoint.deleteEventAlbum}/${eventId}/album`, {
        data: {
          id,
        },
      })
      .then((response) => {
        const result = response.data.status;
        return result;
      })
      .catch((error) => {
        throw error;
      });
  },
  getEventInvitationAlbum: async (
    eventId: string,
    filter: VirtualLoadQueryType
  ): Promise<AttachmentType[]> => {
    return await instance
      .get(
        `${eventManagementEndpoint.getEventInvitationAlbum}/${eventId}/invitation/album`,
        {
          params: filter,
        }
      )
      .then((response) => {
        const result = response.data.result;
        return result;
      })
      .catch((error) => {
        throw error;
      });
  },

  sendNotificationToOrganiser: async (notificationId: string) => {
    return await instance
      .post(
        `${eventManagementEndpoint.sendNotificationToOrganiser}/${notificationId}`
      )
      .then((response) => {
        return response.data?.status;
      })
      .catch((error) => {
        throw error;
      });
  },
};
