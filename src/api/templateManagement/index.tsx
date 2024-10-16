import {
  templateManagementEndpoint,
  instance,
} from "../../configs/axios.config";
import { TemplateAdminType, TemplateType } from "../../types";

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
    const { message, name, type, channel, id, blob } = template;
    const toUpdate = {
      message,
      name,
      type,
      channel,
      id: id,
      blob,
    };
    return await instance
      .put(templateManagementEndpoint.updateTemplate, toUpdate)
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
  getTemplate: async (action: string, filters = {}) => {
    return await instance
      .get(`${templateManagementEndpoint.getTemplate}/${action}/template`, {
        params: filters,
      })
      .then((response) => {
        const result = response.data.result;
        return result;
      })
      .catch((error) => {
        throw error;
      });
  },
  reAppealTemplate: async (template: TemplateAdminType) => {
    const { comment, id } = template;
    const toUpdate = {
      id,
      comment,
    };
    return await instance
      .put(templateManagementEndpoint.reAppealTemplate, toUpdate)
      .then((response) => {
        return true;
      })
      .catch((error) => {
        throw error;
      });
  },
  getTemplateById: async (id: string) => {
    return await instance
      .get(`${templateManagementEndpoint.getTemplateById}${id}`)
      .then((response) => {
        const result = response.data.result;
        return result;
      })
      .catch((error) => {
        throw error;
      });
  },
};
