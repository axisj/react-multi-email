import { SettingsReducer, SettingsActionType } from 'common/interfaces';

const settingsReducer: SettingsReducer = (state, action) => {
  const { type, value } = action;
  switch (type) {
    case SettingsActionType.SET_WIDTH:
      return { ...state, width: value };
    case SettingsActionType.SET_HEIGHT:
      return { ...state, height: value };
    default:
      throw new Error();
  }
};

export default settingsReducer;
