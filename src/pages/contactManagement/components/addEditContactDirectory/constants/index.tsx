export const CONTACT_LIST_COLUMN_KEYS = {
  ID: "id",
  NAME: "name",
  MOBILE: "senderId",
  CREATED_AT: "createdAt",
  UPDATED_AT: "updatedAt",
  ACTION: "action",
};

export const CONTACT_LIST_COLUMN_NAME = {
  ID: "id",
  NAME: "Name",
  MOBILE: "Mobile",
  CREATED_AT: "Creation",
  UPDATED_AT: "Updated",
  ACTION: "Action",
};

export const MOBILE_VIEW_COLUMNS = [
  CONTACT_LIST_COLUMN_KEYS.NAME,
  CONTACT_LIST_COLUMN_KEYS.MOBILE,
  CONTACT_LIST_COLUMN_KEYS.ACTION,
];

export const DIRECTORY_ACTIONS: any = {
  ADD: {
    header: "Create Directory",
    primaryButtonText: "Create",
    primaryButtonAction: "ADD",
    secondaryButtonText: "Cancel",
  },
  EDIT: {
    header: "Update Directory",
    primaryButtonText: "Update",
    primaryButtonAction: "EDIT",
    deleteButtonText: "Delete",
  },
  VIEW: {
    header: "View Directory",
    primaryButtonText: "Edit",
    primaryButtonAction: "VIEW",
  },
};
