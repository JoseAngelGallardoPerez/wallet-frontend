export interface ExtensionsSettingInterface {
  id: number;
  name: string;
  serviceName: string;
  description: string;
  buildInfo: any;
  isActive: boolean;
  type: string;
  apiKeyId: number;
  webhookUrlPath: any;
  createdAt: string;
  updatedAt: string;
  producibleEvents?: { id: number; name: string; }[];
  subscribedEvents?: { id: number; name: string; }[];
  hasSettings?: boolean;
}
