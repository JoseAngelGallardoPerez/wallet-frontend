export interface KYCRequestInterface {
  id: number;
  status: string;
  updatedAt?: string;
  userId: string;

  user: {
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };

  tier: {
    id: number;
    level: number;
    name: string;
  };
}
