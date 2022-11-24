import * as React from 'react';
import styled from '@emotion/styled';
import { ReactMultiEmail } from '../react-multi-email';

interface Props {}

function BasicExample(props: Props) {
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
        />
        <br />
        <h4>react-multi-email value</h4>
        <h3>Focused: {focused ? 'true' : 'false'}</h3>
        <p>{emails.join(', ') || 'empty'}</p>
      </form>
    </Container>
  );
}

const Container = styled.div`
  font-size: 13px;
`;

export default BasicExample;
