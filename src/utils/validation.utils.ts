import { ContactDirectoryType } from "./../types";

export const contactValidator = (directory: ContactDirectoryType) => {
  const { name, contacts } = directory;
  console.log({ name, contacts });
  const isContactError = contacts?.length
    ? contacts?.find((contact) => !contact.name || !contact.senderId)
    : true;
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

export const validateMobileNumber = (mobileNumber: string) => {
  // Regular expression to match a 10-digit mobile number
  const mobileNumberRegex = /^\d{10}$/;

  // Check if the provided mobile number matches the regex
  return mobileNumberRegex.test(mobileNumber);
};
