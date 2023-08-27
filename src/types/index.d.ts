export type ContactListType = {
  key?: string;
  _id: string;
  name: string;
  mobile: number;
  createdAt: string;
  updatedAt: string;
};

export type GenericJsonType = Record<string, any>;

export type ActionType = "VIEW" | "ADD" | "EDIT" | "";

export type ScreenType = "MOBILE" | "TABLET" | "DESKTOP" | "";

export type EditConfigType = {
  text?: string;
  editing?: boolean;
  icon?: React.ReactNode;
  tooltip?: boolean | React.ReactNode;
  onStart?: () => void;
  onChange?: (value: string) => void;
  onCancel?: () => void;
  onEnd?: () => void;
  maxLength?: number;
  autoSize?: boolean;
  triggerType?: ("icon" | "text")[];
  enterIcon?: React.ReactNode;
};

export type UserInfoType = {
  mobile?: number;
  gender?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  state?: string;
  city?: string;
};

export type ContactDirectoryType = {
  _id?: string;
  userId?: number;
  name: string;
  contacts: ContactsType[];
  createdAt?: string;
  updatedAt?: string;
};
