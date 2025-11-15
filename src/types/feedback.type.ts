interface User {
  _id: string;
  name: string;
  sureName: string;
  profileImage: string;
  role: string;
  switchRole: string;
}

interface IFeedback {
  _id: string;
  userId: User;
  text: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface User {
  _id: string;
  name: string;
  email: string;
  profileImage: string;
}

interface IInsurance {
  _id: string;
  userId: User;
  fullName: string;
  companyName: string;
  businessType: string;
  ico: string;
  email: string;
  phoneNumber: string;
  address: string;
  estimatedValue: number;
  anyPreviousEquipment: string;
  additionalNotes: string;
  createdAt: string; // or Date if you parse it
  updatedAt: string; // or Date if you parse it
}

export type { IFeedback, IInsurance };
