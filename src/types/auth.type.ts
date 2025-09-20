interface IJwtPayload {
  userId: string;
  name: string;
  sureName: string;
  companyName: string;
  email: string;
  role: "admin" | "user" | "other";
  iat: number;
  exp: number;
}

export type { IJwtPayload };
