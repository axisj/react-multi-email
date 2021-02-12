import * as React from 'react';
import isEmailFn from './isEmail';
import Spinner from '../components/Spinner';

export interface IReactMultiEmailProps {
  emails?: string[];
  onChange?: (emails: string[]) => void;
  enable?: ({ emailCnt }: { emailCnt: number }) => boolean;
  onDisabled?: () => void; 
  noClass?: boolean;
  validateEmail?: (email: string) => boolean | Promise<boolean>;
  enableSpinner?: boolean;
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
  emails: string[];
  inputValue?: string;
  spinning: boolean;
}

class ReactMultiEmail extends React.Component<
  IReactMultiEmailProps,
  IReactMultiEmailState
> {
  state = {
    focused: false,
    emails: [],
    inputValue: '',
    spinning: false,
  };

  emailInputRef: React.RefObject<HTMLInputElement>;

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

  constructor(props: IReactMultiEmailProps) {
    super(props);

    this.emailInputRef = React.createRef();
  }

  findEmailAddress = (value: string, isEnter?: boolean) => {
    const { enable, onDisabled, validateEmail } = this.props;

    let validEmails: string[] = [];
    let inputValue: string = '';
    const re = /[ ,;]/g;
    const isEmail = validateEmail || isEmailFn;

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
            if (validateResult === true) {
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
            asyncFlag = true;
            if (!enableSpinner || enableSpinner == true) {
              this.setState({ spinning: true });
            }

            if ((await validateEmail!(value)) === true) {
              addEmails('' + arr.shift());
              this.setState({ spinning: false });
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
        if(enable && enable({ emailCnt: this.state.emails.length }) === false) {
          onDisabled && onDisabled();
          return;
        }

        if (isEnter) {
          const validateResult = isEmail(value);
          if (typeof validateResult === 'boolean') {
            if (validateResult === true) {
              addEmails(value);
            } else {
              inputValue = value;
            }
          } else {
            // handle promise
            asyncFlag = true;
            if (!enableSpinner || enableSpinner == true) {
              this.setState({ spinning: true });
            }

            if ((await validateEmail!(value)) === true) {
              addEmails(value);
              this.setState({ spinning: false });
            } else {
              inputValue = value;
            }
          }
        } else {
          inputValue = value;
        }
      }
    }

    this.setState({
      emails: [...this.state.emails, ...validEmails],
      inputValue: inputValue,
    });

    if (validEmails.length && this.props.onChange) {
      // In async, input email is merged.
      if (asyncFlag) this.props.onChange([...this.state.emails]);
      else {
        this.props.onChange([...this.state.emails, ...validEmails]);
      }
    }
  };

  onChangeInputValue = async (value: string) => {
    await this.findEmailAddress(value);
  };

  removeEmail = (index: number) => {
    this.setState(
      (prevState) => {
        return {
          emails: [
            ...prevState.emails.slice(0, index),
            ...prevState.emails.slice(index + 1),
          ],
        };
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(this.state.emails);
        }
      },
    );
  };

  handleOnKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.which) {
      case 13:
      case 9:
        e.preventDefault();
        break;
      case 8:
        if (!e.currentTarget.value) {
          this.removeEmail(this.state.emails.length - 1);
        }
        break;
      default:
    }
  };

  handleOnKeyup = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.which) {
      case 13:
      case 9:
        this.findEmailAddress(e.currentTarget.value, true);
        break;
      default:
    }
  };

  handleOnChange = async (e: React.SyntheticEvent<HTMLInputElement>) =>
    await this.onChangeInputValue(e.currentTarget.value);

  handleOnBlur = (e: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({ focused: false });
    this.findEmailAddress(e.currentTarget.value, true);
  };

  handleOnFocus = () =>
    this.setState({
      focused: true,
    });

  render() {
    const { focused, emails, inputValue, spinning } = this.state;
    const {
      style,
      getLabel,
      className = '',
      noClass,
      placeholder,
    } = this.props;

    return (
      <div
        className={`${className} ${noClass ? '' : 'react-multi-email'} ${
          focused ? 'focused' : ''
        } ${inputValue === '' && emails.length === 0 ? 'empty' : ''}`}
        style={style}
        onClick={() => {
          if (this.emailInputRef.current) {
            this.emailInputRef.current.focus();
          }
        }}
      >
        {spinning && <Spinner />}
        {placeholder ? <span data-placeholder>{placeholder}</span> : null}
        <div
          className={'data-labels'}
          style={{ opacity: spinning ? 0.45 : 1.0, display: 'inherit' }}
        >
          {emails.map((email: string, index: number) =>
            getLabel(email, index, this.removeEmail),
          )}
        </div>
        <input
          style={{ opacity: spinning ? 0.45 : 1.0 }}
          ref={this.emailInputRef}
          type="text"
          value={inputValue}
          onFocus={this.handleOnFocus}
          onBlur={this.handleOnBlur}
          onChange={this.handleOnChange}
          onKeyDown={this.handleOnKeydown}
          onKeyUp={this.handleOnKeyup}
        />
      </div>
    );
  }
}

export default ReactMultiEmail;
