import * as React from 'react';
import styled from '@emotion/styled';
import { ReactMultiEmail } from '../react-multi-email';
import { Button } from 'antd';
import { useRef, useState } from 'react';

interface Props {}

function BasicExample(_props: Props) {
  const [emails, setEmails] = React.useState<string[]>([]);
  const [focused, setFocused] = React.useState(false);
  const [input, setInput] = useState<string>('');

  const ref = useRef<HTMLDivElement>(null);

  return (
    <Container ref={ref}>
      <form>
        <h3>Email</h3>
        <ReactMultiEmail
          label='Emails'
          placeholder='Enter your email'
          emails={emails}
          onChange={(_emails: string[]) => {
            setEmails(_emails);
          }}
          autoFocus={true}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            setInput('');
          }}
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
          inputValue={input}
          onChangeInput={value => {
            console.log(value);
            setInput(value);
          }}
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

export default BasicExample;
