import contactDirectoryList from "../../data/contactDirectoryList.json";
import contactList from "../../data/contactList.json";

const apiTimer = 1000;

export const contactManagementMockAPI = {
  getContactDirectory: (): any => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(contactDirectoryList);
      }, apiTimer);
    });
  },
  getContactList: (): any => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(contactList);
      }, apiTimer);
    });
  },
};
