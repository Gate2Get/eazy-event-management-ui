import contactDirectoryList from "../../data/contactDirectoryList.json";

const apiTimer = 1000;

export const contactManagementMockAPI = {
  getContactDirectory: (): any => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(contactDirectoryList);
      }, apiTimer);
    });
  },
};
