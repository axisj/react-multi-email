export interface IProps {
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

export interface IFqdnOptions {
  requireTld?: boolean;
  allowUnderscores?: boolean;
  allowTrailingDot?: boolean;
}

export interface IEmailOptions {
  allowDisplayName?: boolean;
  requireDisplayName?: boolean;
  allowUtf8LocalPart?: boolean;
  requireTld?: boolean;
}
