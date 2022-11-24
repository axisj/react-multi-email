import * as React from 'react';
import styled from '@emotion/styled';
import { ReactMultiEmail } from '../react-multi-email';

interface Props {}

function CustomizeStyleExample(props: Props) {
  const [emails, setEmails] = React.useState<string[]>([]);

  return (
    <Container>
      <form>
        <h3>Email</h3>
        <ReactMultiEmail
          placeholder={
            <>
              <b>I</b> am <u style={{ color: '#1890ff' }}>placeholder</u> !
            </>
          }
          style={{ minHeight: '100px' }}
          emails={emails}
          onChange={(_emails: string[]) => {
            setEmails(_emails);
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
        />
        <br />
        <h4>react-multi-email value</h4>
        <p>{emails.join(', ') || 'empty'}</p>
      </form>
    </Container>
  );
}

const Container = styled.div`
  font-size: 13px;
`;

export default CustomizeStyleExample;
