export interface KycTierInterface {
  id: number;
  level: number;
  currentLvl?: number;
  status: string;
  requestId: string;
  name: string;
  limitations?: LimitationInterface[];
  requirements: KycTierRequirementsInterface[];
}

export interface KycTierRequirementsInterface {
  id: number | string;
  name: string;
  status: string;
  updatedAt: string;
  elements?: KycRequirementsElementInterface[];
}

export interface KycRequirementsElementInterface {
  index: string;
  name: string;
  type: string;
  value: string | number;
  editing?: boolean;
  options: { name: string; value: number | string }[];
}

export interface KycCurrentTierInterface {
  id: number;
  level: number;
  name: string;
  countryCode?: string;
  limitations?: LimitationInterface[];
}

export interface LimitationInterface {
  index: string;
  name?: string;
  value: string;
}

export interface RequirementValue {
  index: string | number;
  value: string;
}
