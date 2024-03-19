import * as React from 'react';
import styled from '@emotion/styled';
import { isEmail, ReactMultiEmail } from '../react-multi-email';
import { Button } from 'antd';

interface Props {}

export const delay = (ms: number) => new Promise(res => setTimeout(() => res(undefined), ms));

function AsyncValidateExample(_props: Props) {
  const [emails, setEmails] = React.useState<string[]>([]);
  const [focused, setFocused] = React.useState(false);

  return (
    <Container>
      <form>
        <h3>Email</h3>
        <ReactMultiEmail
          placeholder='Input your email'
          emails={emails}
          onChange={(_emails: string[]) => {
            setEmails(_emails);
          }}
          autoFocus={true}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={evt => {
            console.log(evt);
          }}
          onKeyUp={evt => {
            console.log(evt);
          }}
          getLabel={(email, index, removeEmail) => {
            return (
              <div data-tag key={index}>
                <div data-tag-item>{email}</div>
                <span data-tag-handle onClick={() => removeEmail(index)}>
                  ×
                </span>
              </div>
            );
          }}
          onChangeInput={value => {
            console.log(value);
          }}
          validateEmail={async email => {
            await delay(100);
            return isEmail(email);
          }}
          spinner={() => <Spinner>validating...</Spinner>}
        />
        <br />
        <h4>react-multi-email value</h4>
        <h3>Focused: {focused ? 'true' : 'false'}</h3>
        <p>{emails.join(', ') || 'empty'}</p>

        <Button onClick={() => setEmails(['test', 'tt', 'test@gmail.com'])}>
          {`setEmails("['test', 'tt', 'test@gmail.com']")`}
        </Button>
        <Button onClick={() => setEmails([])}>{`setEmails("[]")`}</Button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  font-size: 13px;
`;
const Spinner = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
`;

export default AsyncValidateExample;
