import { createUserStore } from "./user.store";
import { type BearStoreType } from "./types";
import { createAppStore } from "./app.store";
import { createContactStore } from "./contact.store";
import { createTemplateStore } from "./template.store";
import { createDashboardStore } from "./dashboard.store";

export const useBearStore: BearStoreType = {
  userStore: createUserStore,
  appStore: createAppStore,
  contactStore: createContactStore,
  templateStore: createTemplateStore,
  dashboardStore: createDashboardStore,
};
