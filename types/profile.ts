export interface ProfileField {
  label: string;
  value: string;
}

export interface ProfileTag {
  id: string;
  label: string;
  color?: string;
}

export interface ProfileTab {
  id: string;
  label: string;
}

export interface UploadStatus {
  available: boolean;
  label: string;
  description: string;
  buttonLabel: string;
}

export interface AiFeatureToggle {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export interface ConnectedStat {
  id: string;
  label: string;
  value: string;
  icon: string;
}

export interface ProfileCompletion {
  percentage: number;
  missingItems: string[];
}

export interface ProfileData {
  header: {
    fullName: string;
    displayTitle: string;
    email: string;
    memberSince: string;
    avatarUrl: string | null;
    initials: string;
  };
  completion: ProfileCompletion;
  tabs: ProfileTab[];
  personal: {
    fields: ProfileField[];
  };
  body: {
    fields: ProfileField[];
    bodyScan: UploadStatus;
  };
  appearance: {
    fields: ProfileField[];
    selfie: UploadStatus;
  };
  lifestyle: {
    fields: ProfileField[];
  };
  style: {
    styleTags: ProfileTag[];
    favoriteColors: ProfileTag[];
    avoidedColors: ProfileTag[];
    fashionConfidence: number;
  };
  shopping: {
    fields: ProfileField[];
  };
  aiFeatures: AiFeatureToggle[];
  connectedData: ConnectedStat[];
}

export type ProfileSectionId =
  | "personal"
  | "body"
  | "appearance"
  | "lifestyle"
  | "style"
  | "shopping"
  | "preferences";
