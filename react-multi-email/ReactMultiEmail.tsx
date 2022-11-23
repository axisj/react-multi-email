import * as React from 'react';
import { isEmail as isEmailFn } from './isEmail';

export interface IReactMultiEmailProps {
  emails?: string[];
  onChange?: (emails: string[]) => void;
  enable?: ({ emailCnt }: { emailCnt: number }) => boolean;
  onDisabled?: () => void;
  onChangeInput?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  noClass?: boolean;
  validateEmail?: (email: string) => boolean | Promise<boolean>;
  enableSpinner?: boolean;
  style?: object;
  getLabel: (
    email: string,
    index: number,
    removeEmail: (index: number, isDisabled?: boolean) => void,
  ) => React.ReactNode;
  className?: string;
  placeholder?: string | React.ReactNode;
  autoFocus?: boolean;
  spinner?: () => React.ReactNode;
}

export function ReactMultiEmail({
  style,
  getLabel,
  className = '',
  noClass,
  placeholder,
  autoFocus,
  enable,
  onDisabled,
  validateEmail,
  onChange,
  onChangeInput,
  onFocus,
  onBlur,
  spinner,
}: IReactMultiEmailProps) {
  const emailInputRef = React.useRef<HTMLInputElement>(null);

  const [focused, setFocused] = React.useState(false);
  const [emails, setEmails] = React.useState<string[]>([]);
  const [inputValue, setInputValue] = React.useState('');
  const [spinning, setSpinning] = React.useState(false);

  const findEmailAddress = React.useCallback(async (value: string, isEnter?: boolean) => {
    let validEmails: string[] = [];
    let inputValue: string = '';
    const re = /[ ,;]/g;
    const isEmail = validateEmail || isEmailFn;

    const addEmails = (email: string) => {
      for (let i = 0, l = emails.length; i < l; i++) {
        if (emails[i] === email) {
          return false;
        }
      }
      validEmails.push(email);
      return true;
    };

    if (value !== '') {
      if (re.test(value)) {
        let splitData = value.split(re).filter(n => {
          return n !== '' && n !== undefined && n !== null;
        });

        const setArr = new Set(splitData);
        let arr = [...setArr];

        do {
          const validateResult = isEmail('' + arr[0]);

          if (typeof validateResult === 'boolean') {
            if (validateResult) {
              addEmails('' + arr.shift());
            } else {
              if (arr.length === 1) {
                inputValue = '' + arr.shift();
              } else {
                arr.shift();
              }
            }
          } else {
            // handle promise
            setSpinning(true);

            if ((await validateEmail!(value)) === true) {
              addEmails('' + arr.shift());
              setSpinning(false);
            } else {
              if (arr.length === 1) {
                inputValue = '' + arr.shift();
              } else {
                arr.shift();
              }
            }
          }
        } while (arr.length);
      } else {
        if (enable && !enable({ emailCnt: emails.length })) {
          onDisabled?.();
          return;
        }

        if (isEnter) {
          const validateResult = isEmail(value);
          if (typeof validateResult === 'boolean') {
            if (validateResult) {
              addEmails(value);
            } else {
              inputValue = value;
            }
          } else {
            // handle promise
            setSpinning(true);
            if ((await validateEmail!(value)) === true) {
              addEmails(value);
              setSpinning(false);
            } else {
              inputValue = value;
            }
          }
        } else {
          inputValue = value;
        }
      }
    }

    setEmails([...emails, ...validEmails]);
    setInputValue(inputValue);

    if (validEmails.length) {
      onChange?.([...emails, ...validEmails]);
    }

    if (inputValue !== inputValue) {
      onChangeInput?.(inputValue);
    }
  }, []);

  const onChangeInputValue = React.useCallback(
    async (value: string) => {
      onChangeInput?.(value);
      await findEmailAddress(value);
    },
    [emails],
  );

  const removeEmail = React.useCallback(
    (index: number, isDisabled?: boolean) => {
      if (isDisabled) {
        return;
      }

      const _emails = [...emails.slice(0, index), ...emails.slice(index + 1)];
      setEmails(_emails);
      onChange?.(_emails);
    },
    [emails],
  );

  const handleOnKeydown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case 'Enter':
          e.preventDefault();
          break;
        case 'Backspace':
          if (!e.currentTarget.value) {
            removeEmail(emails.length - 1, false);
          }
          break;
        default:
      }
    },
    [emails],
  );

  const handleOnKeyup = React.useCallback(async (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
      case 'Backspace':
        await findEmailAddress(e.currentTarget.value, true);
        break;
      default:
    }
  }, []);

  const handleOnChange = React.useCallback(
    async (e: React.SyntheticEvent<HTMLInputElement>) => await onChangeInputValue(e.currentTarget.value),
    [],
  );

  const handleOnBlur = React.useCallback(
    async (e: React.SyntheticEvent<HTMLInputElement>) => {
      setFocused(false);
      await findEmailAddress(e.currentTarget.value, true);
      onBlur?.();
    },
    [onBlur],
  );

  const handleOnFocus = React.useCallback(() => {
    setFocused(true);
    onFocus?.();
  }, [onFocus]);

  return (
    <div
      className={`${className} ${noClass ? '' : 'react-multi-email'} ${focused ? 'focused' : ''} ${
        inputValue === '' && emails.length === 0 ? 'empty' : ''
      }`}
      style={style}
      onClick={() => emailInputRef.current?.focus()}
    >
      {spinning && spinner?.()}
      {placeholder ? <span data-placeholder>{placeholder}</span> : null}
      <div className={'data-labels'} style={{ opacity: spinning ? 0.45 : 1.0, display: 'inherit' }}>
        {emails.map((email: string, index: number) => getLabel(email, index, removeEmail))}
      </div>
      <input
        style={{ opacity: spinning ? 0.45 : 1.0 }}
        ref={emailInputRef}
        type='text'
        value={inputValue}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
        onKeyDown={handleOnKeydown}
        onKeyUp={handleOnKeyup}
        autoFocus={autoFocus}
      />
    </div>
  );
}
