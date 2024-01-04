import { dashboardEndpoint, instance } from "../../configs/axios.config";
import { EventNotificationType, EventType, GenericJsonType } from "../../types";

export const dashboardAPI = {
  getRecentEventNotification: async (
    id?: string
  ): Promise<EventNotificationType[]> => {
    return await instance
      .get(dashboardEndpoint.getRecentEventNotification, { params: { id } })
      .then((response) => {
        const result = response.data.result;
        return result;
      })
      .catch((error) => {
        throw error;
      });
  },

  getEventStatistics: async (): Promise<GenericJsonType> => {
    return await instance
      .get(dashboardEndpoint.getEventStatistics)
      .then((response) => {
        const result = response.data.result;
        return result;
      })
      .catch((error) => {
        throw error;
      });
  },
};
