import * as React from 'react';
import isEmail from './isEmail';
class ReactMultiEmail extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            focused: false,
            emails: [],
            inputValue: '',
        };
        this.findEmailAddress = (value, isEnter) => {
            let validEmails = [];
            let inputValue = '';
            const re = /[ ,;]/g;
            const addEmails = (email) => {
                const emails = this.state.emails;
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
                    let arr = value.split(re).filter(n => {
                        return n !== '' && n !== undefined && n !== null;
                    });
                    do {
                        if (isEmail('' + arr[0])) {
                            addEmails('' + arr.shift());
                        }
                        else {
                            if (arr.length === 1) {
                                /// 마지막 아이템이면 inputValue로 남겨두기
                                inputValue = '' + arr.shift();
                            }
                            else {
                                arr.shift();
                            }
                        }
                    } while (arr.length);
                }
                else {
                    if (isEnter) {
                        if (isEmail(value)) {
                            addEmails(value);
                        }
                        else {
                            inputValue = value;
                        }
                    }
                    else {
                        inputValue = value;
                    }
                }
            }
            this.setState({
                emails: [...this.state.emails, ...validEmails],
                inputValue: inputValue,
            });
            if (validEmails.length && this.props.onChange) {
                this.props.onChange([...this.state.emails, ...validEmails]);
            }
        };
        this.onChangeInputValue = (value) => {
            this.findEmailAddress(value);
        };
        this.removeEmail = (index) => {
            this.setState(prevState => {
                return {
                    emails: [
                        ...prevState.emails.slice(0, index),
                        ...prevState.emails.slice(index + 1),
                    ],
                };
            }, () => {
                if (this.props.onChange) {
                    this.props.onChange(this.state.emails);
                }
            });
        };
    }
    static getDerivedStateFromProps(nextProps, prevState) {
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
    render() {
        const { focused, emails, inputValue } = this.state;
        const { style, getLabel, className = '', placeholder } = this.props;
        // removeEmail
        return (React.createElement("div", { className: `${className} react-multi-email ${focused ? 'focused' : ''} ${inputValue === '' && emails.length === 0 ? 'empty' : ''}`, style: style, onClick: () => {
                this.emailInput.focus();
            } },
            placeholder ? React.createElement("span", { "data-placeholder": true }, placeholder) : null,
            emails.map((email, index) => getLabel(email, index, this.removeEmail)),
            React.createElement("input", { ref: ref => {
                    if (ref) {
                        this.emailInput = ref;
                    }
                }, type: "text", value: inputValue, onFocus: () => this.setState({
                    focused: true,
                }), onBlur: (e) => {
                    this.setState({ focused: false });
                    this.findEmailAddress(e.target.value, true);
                }, onChange: (e) => this.onChangeInputValue(e.target.value), onKeyDown: (e) => {
                    if (e.which === 8 && !e.target.value) {
                        this.removeEmail(this.state.emails.length - 1);
                    }
                }, onKeyUp: (e) => {
                    if (e.which === 13) {
                        this.findEmailAddress(e.target.value, true);
                    }
                } })));
    }
}
export default ReactMultiEmail;
