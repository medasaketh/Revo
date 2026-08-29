export interface SettingsCategory {
  id: string;
  label: string;
  icon: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface ToggleSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export interface SliderSetting {
  id: string;
  label: string;
  description: string;
  value: number;
  options: SelectOption[];
}

export interface SessionInfo {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  current: boolean;
}

export interface DataAction {
  id: string;
  label: string;
  description: string;
  variant: "default" | "danger";
}

export interface SupportLink {
  id: string;
  label: string;
  href: string;
}

export interface SettingsData {
  categories: SettingsCategory[];
  general: {
    language: string;
    timezone: string;
    units: string;
    temperature: string;
    dateFormat: string;
    theme: string;
    languageOptions: SelectOption[];
    timezoneOptions: SelectOption[];
    unitsOptions: SelectOption[];
    temperatureOptions: SelectOption[];
    dateFormatOptions: SelectOption[];
    themeOptions: SelectOption[];
  };
  account: {
    name: string;
    email: string;
  };
  notifications: ToggleSetting[];
  privacy: ToggleSetting[];
  appearance: {
    theme: string;
    accentColor: string;
    cardDensity: string;
    animations: boolean;
    compactMode: boolean;
    fontSize: string;
    themeOptions: SelectOption[];
    accentOptions: SelectOption[];
    densityOptions: SelectOption[];
    fontSizeOptions: SelectOption[];
  };
  aiPreferences: SliderSetting[];
  security: {
    twoFactorEnabled: boolean;
    sessions: SessionInfo[];
  };
  dataActions: DataAction[];
  support: {
    links: SupportLink[];
    version: string;
  };
}
