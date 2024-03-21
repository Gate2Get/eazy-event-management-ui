export const PLAN_TABLE_ROWS = [
  "name",
  "type",
  "albumCount",
  "eventCount",
  "contactDirectoryCount",
  "contactCount",
  "templateCount",
  "notificationCredit",
  "price",
];

export const PLAN_TABLE_NOTIFICATION_PRICE_ROWS = [
  "whatsAppPrice",
  "smsPrice",
  "voiceCallPrice",
];

export const PLAN_TABLE_NOTIFICATION_PRICE_MAP: Record<string, string> = {
  whatsAppPrice: "WhatsApp Price",
  smsPrice: "SMS Price",
  voiceCallPrice: "Voice Call Price",
};

export const PLAN_NAME_MAP: Record<string, string> = {
  name: "Name",
  type: "Type",
  albumCount: "Album Count",
  eventCount: "Event Count",
  contactDirectoryCount: "Contact Directory Count",
  contactCount: "Contact Count",
  templateCount: "Template Count",
  notificationCredit: "Notification Credit",
  price: "Price",
};
