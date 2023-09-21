import { commonEndpoint, instance } from "../../configs/axios.config";

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
};
