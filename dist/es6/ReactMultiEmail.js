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
            this.state.emails.splice(index, 1);
            this.setState({
                emails: this.state.emails,
            });
            if (this.props.onChange) {
                this.props.onChange(this.state.emails);
            }
        };
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.emails !== nextProps.emails) {
            return { emails: nextProps.emails || [], inputValue: '', focused: false };
        }
        return null;
    }
    render() {
        const { focused, emails, inputValue } = this.state;
        const { style, getLabel } = this.props;
        // removeEmail
        return (React.createElement("div", { className: 'react-multi-email ' + (focused ? 'focused' : ''), style: style, onClick: (e) => {
                this.emailInput.focus();
            } },
            emails.map((email, index) => getLabel(email, index, this.removeEmail)),
            React.createElement("input", { ref: ref => {
                    if (ref) {
                        this.emailInput = ref;
                    }
                }, type: "text", value: inputValue, onFocus: (e) => this.setState({ focused: true }), onBlur: (e) => {
                    this.setState({ focused: false });
                    this.findEmailAddress(e.target.value, true);
                }, onChange: (e) => this.onChangeInputValue(e.target.value), onKeyUp: (e) => {
                    if (e.which === 13) {
                        this.findEmailAddress(e.target.value, true);
                    }
                } })));
    }
}
export default ReactMultiEmail;
