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

export type { IFeedback };
