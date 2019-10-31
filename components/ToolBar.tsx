import * as React from 'react';
import {
  ISettingsAction,
  ISettings,
  SettingsActionType,
} from 'common/interfaces';
import Form, { FormComponentProps } from 'antd/lib/form';
import { InputNumber } from 'antd';
import { debounce } from 'lodash';

interface IProps extends FormComponentProps, ISettings {
  dispatchSettings: (action: ISettingsAction) => void;
}
const ToolBarForm: React.FC<IProps> = props => {
  const { width, height } = props;
  const handleChangeOption = debounce((action: ISettingsAction) => {
    props.dispatchSettings && props.dispatchSettings(action);
  }, 300);

  return (
    <Form layout="vertical" colon={false}>
      <Form.Item label={'width'}>
        <InputNumber
          size="small"
          min={100}
          defaultValue={width}
          onChange={value => {
            handleChangeOption({
              type: SettingsActionType.SET_WIDTH,
              value,
            });
          }}
        />
      </Form.Item>
      <Form.Item label={'height'}>
        <InputNumber
          size="small"
          min={100}
          defaultValue={height}
          onChange={value => {
            handleChangeOption({
              type: SettingsActionType.SET_HEIGHT,
              value,
            });
          }}
        />
      </Form.Item>
    </Form>
  );
};

const ToolBar = Form.create<IProps>({})(ToolBarForm);
export default ToolBar;
