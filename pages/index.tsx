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
import ReactMultiEmail from '../packages/react-multi-email/ReactMultiEmail';

const initialSettings: ISettings = {
  width: 300,
  height: 400,
};
const Home: React.FC = props => {
  const [settings, dispatchSettings] = useReducer(
    settingsReducer,
    initialSettings,
  );
  const [emails, setEmails] = useState();

  useEffect(() => {
    //
  }, []);

  return (
    <div>
      Hello World!
      <br />
      width: {settings.width}, height: {settings.height}
      <ReactMultiEmail
        placeholder="Input your email"
        emails={emails}
        onChange={(_emails: string[]) => {
          console.log(_emails);
          setEmails({ emails: _emails });
        }}
        getLabel={(
          email: string,
          index: number,
          removeEmail: (index: number) => void,
        ) => {
          return (
            <div data-tag key={index}>
              <div data-tag-item>{email}</div>
              <span data-tag-handle onClick={() => removeEmail(index)}>
                ×
              </span>
            </div>
          );
        }}
      />
    </div>
  );
};

export default Home;
