import React, {
  useContext,
  useState,
  useEffect,
  useReducer,
  Reducer,
} from 'react';
import 'styles/global';
import '@babel/polyfill';
import { ISettings } from 'common/interfaces';
import { settingsReducer } from 'store';
import ToolBar from 'components/ToolBar';
// import { ReactMultiEmail } from '@axui/react-multi-email/ReactMultiEmail';

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
