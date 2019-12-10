import * as React from 'react';
import isEmailFn from './isEmail';
import { useState, createRef } from 'react';
import { IProps } from './PropsInterfaces';

const ReactMultiEmail: React.FC<IProps> = props => {
  const [focused, setFocused] = useState<boolean>(false);
  const [emails, setEmails] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const emailInputRef = createRef<HTMLInputElement>();
  const { style, getLabel, className = '', noClass, placeholder } = props;

  function findEmailAddress(value: string, isEnter?: boolean) {
    const { validateEmail } = props;
    let validEmails: string[] = [];
    let findingInputValue: string = '';
    const re = /[ ,;]/g;
    const isEmail = validateEmail || isEmailFn;

    const addEmails = (email: string) => {
      const addingEmails: string[] = emails;

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
          if (isEmail('' + arr[0])) {
            addEmails('' + arr.shift());
          } else {
            if (arr.length === 1) {
              /// 마지막 아이템이면 inputValue로 남겨두기
              findingInputValue = '' + arr.shift();
            } else {
              arr.shift();
            }
          }
        } while (arr.length);
      } else {
        if (isEnter) {
          if (isEmail(value)) {
            addEmails(value);
          } else {
            findingInputValue = value;
          }
        } else {
          findingInputValue = value;
        }
      }
    }

    setEmails([...emails, ...validEmails]);
    setInputValue(findingInputValue);

    if (validEmails.length && props.onChange) {
      props.onChange([...emails, ...validEmails]);
    }
  }

  function onChangeInputValue(value: string) {
    findEmailAddress(value);
  }

  function removeEmail(index: number) {
    setEmails([...emails.slice(0, index), ...emails.slice(index + 1)]),
      () => {
        if (props.onChange) {
          props.onChange(emails);
        }
      };
  }

  function handleOnKeydown(e: React.KeyboardEvent<HTMLInputElement>) {
    switch (e.which) {
      case 13:
      case 9:
        e.preventDefault();
        break;
      case 8:
        if (!e.currentTarget.value) {
          removeEmail(emails.length - 1);
        }
        break;
      default:
    }
  }

  function handleOnKeyup(e: React.KeyboardEvent<HTMLInputElement>) {
    switch (e.which) {
      case 13:
      case 9:
        findEmailAddress(e.currentTarget.value, true);
        break;
      default:
    }
  }

  function handleOnChange(e: React.SyntheticEvent<HTMLInputElement>) {
    onChangeInputValue(e.currentTarget.value);
  }

  function handleOnBlur(e: React.SyntheticEvent<HTMLInputElement>) {
    setFocused(false);
    findEmailAddress(e.currentTarget.value, true);
  }

  const handleOnFocus = () => setFocused(true);

  return (
    <div
      className={`${className} ${noClass ? '' : 'react-multi-email'} ${
        focused ? 'focused' : ''
      } ${inputValue === '' && emails.length === 0 ? 'empty' : ''}`}
      style={style}
      onClick={() => {
        if (emailInputRef.current) {
          emailInputRef.current.focus();
        }
      }}
    >
      {placeholder ? <span data-placeholder>{placeholder}</span> : null}
      {emails.map((email: string, index: number) =>
        getLabel(email, index, removeEmail),
      )}
      <input
        ref={emailInputRef}
        type="text"
        value={inputValue}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
        onKeyDown={handleOnKeydown}
        onKeyUp={handleOnKeyup}
      />
    </div>
  );
};

export default ReactMultiEmail;
