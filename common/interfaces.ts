export interface ISettings {
  width?: number;
  height?: number;
}

export interface ISettingsAction {
  type: SettingsActionType;
  value?: any;
}

export enum SettingsActionType {
  SET_WIDTH = 'width',
  SET_HEIGHT = 'height',
}

export type SettingsReducer = (
  state: ISettings,
  action: ISettingsAction,
) => ISettings;
