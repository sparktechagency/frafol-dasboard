interface IReport {
  _id: string;
  userId: {
    _id: string;
    name: string;
    sureName: string;
    profileImage: string;
    role: string;
    switchRole: string;
  };
  reason: string;
  isCompleted: boolean;
  isNotified: boolean;
  isDeleted: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export type { IReport };
