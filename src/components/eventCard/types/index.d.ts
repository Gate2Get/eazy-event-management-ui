export type EventCardType = {
  name: string;
  approvalStatus: "APPROVED" | "PENDING" | "REJECTED";
  progressionStatus: "COMPLETED" | "IN_PROGRESS" | "DRAFT";
  createdAt: string;
  eventType: "MARRIAGE" | "BIRTHDAY" | "OTHERS";
};
