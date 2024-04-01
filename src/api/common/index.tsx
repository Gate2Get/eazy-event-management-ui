import { commonEndpoint, instance } from "../../configs/axios.config";
import {
  ContactUsType,
  FeedbackType,
  PlanType,
  ReportBugsType,
  UserLocationType,
} from "../../types";

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
        const result = response.data;
        return result;
      })
      .catch((error) => {
        throw error;
      });
  },

  contactUs: async (contactUs: ContactUsType): Promise<any> => {
    return await instance
      .post(commonEndpoint.contactUs, contactUs)
      .then((response) => {
        const result = response.data;
        return result;
      })
      .catch((error) => {
        throw error;
      });
  },

  submitFeedback: async (feedback: FeedbackType): Promise<any> => {
    return await instance
      .post(commonEndpoint.submitFeedback, feedback)
      .then((response) => {
        const result = response.data;
        return result;
      })
      .catch((error) => {
        throw error;
      });
  },

  uploadFile: async (file: any, type: string): Promise<string> => {
    const data = new FormData();
    data.append("file", file);
    data.append("name", file.name);
    data.append("format", file.type);
    return await instance
      .post(`${commonEndpoint.uploadFile}/${type}`, data)
      .then((response) => {
        const data = response.data;
        const url = data.url;
        return url;
      })
      .catch((error) => {
        throw error;
      });
  },

  getDataByPinCode: async (pinCode: string): Promise<UserLocationType[]> => {
    return await instance
      .get(`${commonEndpoint.getDataByPinCode}${pinCode}`)
      .then((response) => {
        const result = response.data.records;
        return result;
      })
      .catch((error) => {
        throw error;
      });
  },
  getPricingPlans: async (): Promise<PlanType[]> => {
    return await instance
      .get(commonEndpoint.getPricingPlans)
      .then((response) => {
        console.log({response});
        return response.data.result;
      })
      .catch((error) => {
        throw error;
      });
  },
};
