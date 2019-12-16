import React, { useReducer, useState, createRef, useEffect } from 'react';
import isEmailFn from '../isEmail';

interface IUseEmailParam {
  onChange?: (emails: string[]) => void;
  validateEmail?: (email: string) => boolean;
}
const useEmail = (param: IUseEmailParam) => {
  const { onChange, validateEmail } = param;
  const [focused, setFocused] = useState<boolean>(false);
  const [emails, setEmails] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const emailInputRef = createRef<HTMLInputElement>();
  const [prop, setProp] = useState({});

  const onChangeInputValue = (value: string) => {
    findEmailAddress(value);
  };

  const findEmailAddress = (value: string, isEnter?: boolean) => {
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

    if (validEmails.length && onChange) {
      onChange([...emails, ...validEmails]);
    }
  };

  const removeEmail = (index: number, props?: any) => {
    setEmails([...emails.slice(0, index), ...emails.slice(index + 1)]),
      () => {
        if (onChange) {
          onChange(emails);
        }
      };
  };

  const handleOnKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.which) {
      case 13:
      case 9:
        e.preventDefault();
        break;
      case 8: //backspace
        if (!e.currentTarget.value) {
          removeEmail(emails.length - 1);
        }
        break;
      default:
    }
  };

  const handleOnKeyup = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.which) {
      case 13: //enter
      case 9: //tab
        findEmailAddress(e.currentTarget.value, true);
        break;
      default:
    }
  };

  const handleOnChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    onChangeInputValue(e.currentTarget.value);
  };

  const handleOnBlur = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setFocused(false);
    findEmailAddress(e.currentTarget.value, true);
  };

  const handleOnFocus = () => setFocused(true);

  return {
    emails,
    focused,
    inputValue,
    prop,
    setProp,
    setEmails,
    setFocused,
    setInputValue,
    emailInputRef,
    handleOnKeydown,
    handleOnKeyup,
    handleOnChange,
    handleOnBlur,
    handleOnFocus,
    onChangeInputValue,
    findEmailAddress,
    removeEmail,
  };
};

export default useEmail;
