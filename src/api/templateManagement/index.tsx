import {
  templateManagementEndpoint,
  instance,
} from "../../configs/axios.config";
import { TemplateType } from "../../types";

const apiTimer = 1000;

export const templateManagementAPI = {
  createTemplate: async (template: TemplateType) => {
    return await instance
      .post(templateManagementEndpoint.createTemplate, template)
      .then((response) => {
        return true;
      })
      .catch((error) => {
        throw error;
      });
  },
  updateTemplate: async (template: TemplateType) => {
    return await instance
      .put(templateManagementEndpoint.updateTemplate, template)
      .then((response) => {
        return true;
      })
      .catch((error) => {
        throw error;
      });
  },
  deleteTemplate: async (id: string) => {
    return await instance
      .delete(`${templateManagementEndpoint.deleteTemplate}${id}`)
      .then((response) => {
        return true;
      })
      .catch((error) => {
        throw error;
      });
  },
  getTemplate: async () => {
    return await instance
      .get(templateManagementEndpoint.getTemplate)
      .then((response) => {
        const result = response.data.result;
        return result;
      })
      .catch((error) => {
        throw error;
      });
  },
};
