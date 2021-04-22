export interface FileInterface {
  id: number;
  contentType: string;
  filename: string;
  size: number;
  userId: string;
  isAdminOnly: boolean;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
}
