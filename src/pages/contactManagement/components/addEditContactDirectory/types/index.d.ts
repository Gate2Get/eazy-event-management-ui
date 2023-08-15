import { ActionType } from "../../../../../types";

export type AddEditContactDirectoryType = {
  isOpen: boolean;
  action: ActionType;
  setOpen: (isOpen: ActionType) => void;
};
