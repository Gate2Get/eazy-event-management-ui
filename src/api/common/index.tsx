import { commonEndpoint, instance } from "../../configs/axios.config";
import { ReportBugsType } from "../../types";

export const commonAPI = {
  getAlerts: async (): Promise<any> => {
    return await instance
      .get(commonEndpoint.getAlerts)
      .then((response) => {
        const result = response.data.result;
        return result;
      })
      .catch((error) => {
        throw error;
      });
  },

  createBug: async (bug: ReportBugsType): Promise<any> => {
    return await instance
      .post(commonEndpoint.createBug, bug)
      .then((response) => {
        const result = response.data.result;
        return result;
      })
      .catch((error) => {
        throw error;
      });
  },
};
