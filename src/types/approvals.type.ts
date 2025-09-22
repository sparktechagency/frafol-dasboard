interface IProfessional {
  _id: string;
  profileId: string;
  name: string;
  sureName: string;
  companyName: string;
  email: string;
  profileImage: string;
  role: string;
  switchRole: string;
  address: string;
  town: string;
  country: string;
  hourlyRate: number;
  ico: string;
  dic: string;
  ic_dph: string;
  rating: number;
  totalReview: number;
  averageRating: number;
  photographerSpecializations: string[];
  videographerSpecializations: string[];
  adminVerified: string;
  isBlocked: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  galery: string[]; // Assuming gallery can be an array of any type, you can specify it further if needed
}

export type { IProfessional };
