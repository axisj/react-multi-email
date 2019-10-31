import React, {
  useContext,
  useState,
  useEffect,
  useReducer,
  Reducer,
} from 'react';
import 'styles/global';
import { ISettings } from 'common/interfaces';
import { settingsReducer } from 'store';
import ToolBar from 'components/ToolBar';

const initialSettings: ISettings = {
  width: 300,
  height: 400,
};
const Home: React.FC = props => {
  const [settings, dispatchSettings] = useReducer(
    settingsReducer,
    initialSettings,
  );

  useEffect(() => {
    //
  }, []);

  return (
    <div>
      Hello World!
      <br />
      width: {settings.width}, height: {settings.height}
      <ToolBar {...settings} dispatchSettings={dispatchSettings} />
    </div>
  );
};

export default Home;
