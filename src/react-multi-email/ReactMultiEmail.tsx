import * as React from 'react';
import isEmail from './isEmail';
import ReactDOM = require('react-dom');

export interface IReactMultiEmailProps {
  emails?: string[];
  onChange?: (emails: string[]) => void;
  style?: object;
  getLabel: (
    email: string,
    index: number,
    removeEmail: (index: number) => void,
  ) => void;
  className?: string;
  placeholder?: string | React.ReactNode;
}

export interface IReactMultiEmailState {
  focused?: boolean;
  propsEmails?: string[];
  emails?: string[];
  inputValue?: string;
}

class ReactMultiEmail extends React.Component<IReactMultiEmailProps> {
  state = {
    focused: false,
    emails: [],
    inputValue: '',
    result:[],
  };

  private emailInput: HTMLInputElement;

  static getDerivedStateFromProps(
    nextProps: IReactMultiEmailProps,
    prevState: IReactMultiEmailState,
  ) {
    if (prevState.propsEmails !== nextProps.emails) {
      return {
        propsEmails: nextProps.emails || [],
        emails: nextProps.emails || [],
        inputValue: '',
        focused: false,
      };
    }
    return null;
  }

  findEmailAddress = (value: string, isEnter?: boolean) => {
    let validEmails: string[] = [];
    let inputValue: string = '';
    const re = /[ ,;]/g;

    const addEmails = (email: string) => {
      const emails: string[] = this.state.emails;
      for (let i = 0, l = emails.length; i < l; i++) {
        if (emails[i] === email) {
          return false;
        }
      }
      validEmails.push(email);
      return true;
    };
    let result;

    if (value !== '') {
      if (!value || value.indexOf('@') >= 0) {
        result = [''];
        this.setState({ result });
      } else {
        result = ['gmail.com', 'naver.com', 'daum.net'].map(domain => `${value}@${domain}`);
        this.setState({ result });
      }

      if (re.test(value)) {
        let arr = value.split(re).filter(n => {
          return n !== '' && n !== undefined && n !== null;
        });

        do {
          if (isEmail('' + arr[0])) {
            addEmails('' + arr.shift());
          } else {
            if (arr.length === 1) {
              /// 마지막 아이템이면 inputValue로 남겨두기
              inputValue = '' + arr.shift();
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
            inputValue = value;
          }
        } else {
          inputValue = value;
        }
      }
    }
    else{
      result = [''];
      this.setState({ result });
    }

    this.setState({
      emails: [...this.state.emails, ...validEmails],
      inputValue: inputValue,
    });

    if (validEmails.length && this.props.onChange) {
      this.props.onChange([...this.state.emails, ...validEmails]);
    }
  };

  onChangeInputValue = (value: string) => {
    this.findEmailAddress(value);
  };

  removeEmail = (index: number) => {
    this.state.emails.splice(index, 1);
    this.setState({
      emails: this.state.emails,
    });

    if (this.props.onChange) {
      this.props.onChange(this.state.emails);
    }
  };

  render() {
    const { focused, emails, inputValue, result } = this.state;
    const { style, getLabel, className = '', placeholder } = this.props;
    const children = result.map((inputValue) => {
      return <option className={'options'} key={inputValue}>{inputValue}</option>;
    });

    // removeEmail

    return (
      <div
        className={`${className} react-multi-email ${
          focused ? 'focused' : ''
        } ${inputValue === '' && emails.length === 0 ? 'empty' : ''}`}
        style={style}
        onClick={() => {
          this.emailInput.focus();
        }}
      >
        {placeholder ? <span data-placeholder>{placeholder}</span> : null}
        {emails.map((email: string, index: number) =>
          getLabel(email, index, this.removeEmail),
        )}
        <input
          ref={ref => {
            if (ref) {
              this.emailInput = ref;
            }
          }}
          type="text"
          value={inputValue}
          onFocus={() =>
            this.setState({
              focused: true,
            })
          }
          onBlur={(e: any) => {
            this.setState({ focused: false });
            this.findEmailAddress(e.target.value, true);
          }}
          onChange={(e: any) => this.onChangeInputValue(e.target.value)}
          onKeyDown={(e: any) => {
            if (e.which === 8 && !e.target.value) {
              this.removeEmail(this.state.emails.length - 1);
            }
          }}
          onKeyUp={(e: any) => {
            if (e.which === 13) {
              this.findEmailAddress(e.target.value, true);
            }
          }}
        />
        <ul className={`result_list ${
          inputValue === '' ? 'empty' : ''}`} style={style}>
          <li
            onClick={(e: any) => {
              this.setState({inputValue:e.target.value, result:[]});
            }}
          >{children}</li>
        </ul>
      </div>
    );
  }
}

export default ReactMultiEmail;
