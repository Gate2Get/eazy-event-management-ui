import { instance, paymentEndpoint } from "../../configs/axios.config";

export const paymentAPI = {
  buyPlanPayment: async (planId: string): Promise<any> => {
    return await instance
      .post(paymentEndpoint.buyPlanPayment, { planId })
      .then((response) => {
        const result = response.data;
        return result;
      })
      .catch((error) => {
        throw error;
      });
  },

  checkPlanPaymentAndAssignPlan: async (paymentToken: string): Promise<any> => {
    return await instance
      .post(paymentEndpoint.checkPlanPaymentAndAssignPlan, { paymentToken })
      .then((response) => {
        const result = response.data;
        return result;
      })
      .catch((error) => {
        throw error;
      });
  },
};
