import { ContactDirectoryType } from "./../types";

export const contactValidator = (directory: ContactDirectoryType) => {
  const { name, contacts } = directory;
  console.log({ name, contacts });
  const isContactError = contacts?.find(
    (contact) => !contact.name || !contact.senderId
  );
  console.log(isContactError, !name, !contacts);
  return !!isContactError || !name || !contacts;
};

export const validateEmail = (_: any, value: string) => {
  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!value || emailRegex.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject(new Error("Invalid email format"));
};
