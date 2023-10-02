export interface IRefresh {
  userId: string;
  userAgent: string;
  token: string;
  fingerprint: string;
  ip: string;
  expiresIn: Date;
  createdAt: Date;
}
