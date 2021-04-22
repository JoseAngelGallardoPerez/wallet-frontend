export interface PermissionCategoryInterface {
  id: number;
  name: string;
  sort: number;
  permissions: PermissionInterface[];
}

export interface PermissionInterface  {
  id: number;
  name: string;
  categoryId: number;
  parentId: number;
  key: string;
  enabled: boolean;
  sort: number;
  children: PermissionInterface[] | null;
}
