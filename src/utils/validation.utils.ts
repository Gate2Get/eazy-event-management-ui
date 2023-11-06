import { ContactDirectoryType } from "./../types";

export const contactValidator = (directory: ContactDirectoryType) => {
  const { name, contacts } = directory;
  const isContactError = contacts?.find(
    (contact) => !contact.name || !contact.mobile
  );
  return isContactError || !name || !contacts;
};
