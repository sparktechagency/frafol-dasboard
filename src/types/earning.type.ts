export interface UserSummary {
  _id: string;
  name: string;
  email: string;
  profileImage?: string;
}

export interface ITransaction {
  _id: string;
  transactionId: string;
  userId: UserSummary;
  serviceProviderId: UserSummary;
  amount: number;
  commission: number;
  netAmount: number;
  paymentStatus: "completed" | "pending" | "failed";
  paymentMethod: "stripe" | "paypal" | string;
  paymentType: "event" | "gear" | string;
  eventOrderId?: string;
  gearOrderIds: string[];
  serviceProviders: UserSummary[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
