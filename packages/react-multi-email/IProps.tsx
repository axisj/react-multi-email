import * as React from 'react'

interface IProps {
    emails?: string[];
    onChange?: (emails: string[]) => void;
    noClass?: boolean;
    validateEmail?: (email: string) => boolean;
    style?: object;
    getLabel: (
      email: string,
      index: number,
      removeEmail: (index: number) => void,
    ) => void;
    className?: string;
    placeholder?: string | React.ReactNode;
  }

  export default IProps;