import { dashboardEndpoint, instance } from "../../configs/axios.config";
import { EventType } from "../../types";

export const dashboardAPI = {
  getRecentEvent: async (id?: string): Promise<EventType> => {
    return await instance
      .get(dashboardEndpoint.getRecentEvent, { params: { id } })
      .then((response) => {
        const result = response.data.result;
        return result;
      })
      .catch((error) => {
        throw error;
      });
  },
};
