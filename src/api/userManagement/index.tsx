import { instance, userManagementEndpoint } from "../../configs/axios.config";
import { UserInfoType } from "../../types";

export const userManagementAPI = {
  loginUser: async (mobile: number): Promise<any> => {
    return await instance
      .post(userManagementEndpoint.loginUser, { mobile })
      .then((response) => {
        return true;
      })
      .catch((error) => {
        throw error;
      });
  },
  verifyOTP: async (mobile: number, otp: number) => {
    return await instance
      .post(userManagementEndpoint.verifyOTP, { mobile, otp })
      .then((response) => {
        return true;
      })
      .catch((error) => {
        throw error;
      });
  },
  getUserInfo: async () => {
    return await instance
      .get(userManagementEndpoint.getUserInfo)
      .then((response) => {
        console.log(response.data.userInfo);
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
        console.log(response.data);
        const isAuthenticated = response.data.status;
        return isAuthenticated;
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
};
