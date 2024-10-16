import { instance, userManagementEndpoint } from "../../configs/axios.config";
import {
  DateFilterType,
  PlanPaymentTransactionType,
  UserInfoType,
} from "../../types";

export const userManagementAPI = {
  requestOtp: async (): Promise<any> => {
    return await instance
      .get(userManagementEndpoint.requestOtp)
      .then((response) => {
        return true;
      })
      .catch((error) => {
        throw error;
      });
  },
  loginEmailUser: async (email: string): Promise<any> => {
    return await instance
      .post(userManagementEndpoint.loginEmailUser, { email })
      .then((response) => {
        return true;
      })
      .catch((error) => {
        throw error;
      });
  },
  verifyOTP: async (otp: number) => {
    return await instance
      .post(userManagementEndpoint.verifyOTP, { otp })
      .then((response) => {
        return response.data?.status;
      })
      .catch((error) => {
        throw error;
      });
  },
  verifyEmailOTP: async (otp: string) => {
    return await instance
      .post(userManagementEndpoint.verifyEmailOTP, { otp })
      .then((response) => {
        return response.data.status;
      })
      .catch((error) => {
        throw error;
      });
  },
  getUserInfo: async () => {
    return await instance
      .get(userManagementEndpoint.getUserInfo)
      .then((response) => {
        const userInfo = response.data.userInfo;
        return userInfo;
      })
      .catch((error) => {
        throw error;
      });
  },

  updateUserInfo: async (userInfo: UserInfoType) => {
    return await instance
      .put(userManagementEndpoint.updateUserInfo, userInfo)
      .then((response) => {
        return true;
      })
      .catch((error) => {
        throw error;
      });
  },

  verifyAuth: async () => {
    return await instance
      .get(userManagementEndpoint.verifyAuth)
      .then((response) => {
        const isAuthenticated = response.data.status;
        const isContactToken = response.data.isContactToken;
        return { isAuthenticated, isContactToken };
      })
      .catch((error) => {
        throw error;
      });
  },

  logout: async () => {
    return await instance
      .post(userManagementEndpoint.logout)
      .then((response) => {
        console.log(response.data);
        const isLoggedOut = response.data.status;
        return isLoggedOut;
      })
      .catch((error) => {
        throw error;
      });
  },

  getUserSession: async () => {
    return await instance
      .get(userManagementEndpoint.getUserSession)
      .then((response) => {
        const userInfo = response.data.result;
        return userInfo;
      })
      .catch((error) => {
        throw error;
      });
  },

  deleteUserSession: async (sessionId: string) => {
    return await instance
      .post(userManagementEndpoint.deleteUserSession, { sessionId })
      .then((response) => {
        return true;
      })
      .catch((error) => {
        throw error;
      });
  },

  getWalletTransaction: async (filter: DateFilterType) => {
    return await instance
      .get(userManagementEndpoint.getWalletTransaction, {
        params: filter,
      })
      .then((response) => {
        const transactions = response.data.result;
        return transactions;
      })
      .catch((error) => {
        throw error;
      });
  },

  generatePaymentLink: async (amount: number) => {
    return await instance
      .get(`${userManagementEndpoint.generatePaymentLink}/amount`)
      .then((response) => {
        const url = response.data.result;
        return url;
      })
      .catch((error) => {
        throw error;
      });
  },

  getActiveUserPricingPlan: async () => {
    return await instance
      .get(userManagementEndpoint.getActiveUserPricingPlan)
      .then((response) => {
        const plan = response.data.result;
        return plan;
      })
      .catch((error) => {
        throw error;
      });
  },

  getServiceTransactionLogs: async () => {
    return await instance
      .get(userManagementEndpoint.getServiceTransactionLogs)
      .then((response) => {
        const logs = response.data.result;
        return logs;
      })
      .catch((error) => {
        throw error;
      });
  },

  getPlanPaymentTransactions: async (): Promise<any> => {
    return await instance
      .get(userManagementEndpoint.getPlanPaymentTransactions)
      .then((response) => {
        const result = response.data.result;
        return result;
      })
      .catch((error) => {
        throw error;
      });
  },

  getPlanPaymentTransactionById: async (
    transactionId: string
  ): Promise<PlanPaymentTransactionType> => {
    return await instance
      .get(
        `${userManagementEndpoint.getPlanPaymentTransactionById}/${transactionId}`
      )
      .then((response) => {
        const result = response.data.result;
        return result;
      })
      .catch((error) => {
        throw error;
      });
  },
};
