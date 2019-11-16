"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var isEmail_1 = require("./isEmail");
var ReactMultiEmail = function (props) {
    var _a = react_1.useState(false), focused = _a[0], setFocused = _a[1];
    var _b = react_1.useState([]), emails = _b[0], setEmails = _b[1];
    var _c = react_1.useState(''), inputValue = _c[0], setInputValue = _c[1];
    var emailInputRef = react_1.createRef();
    var getDerivedStateFromProps = function (nextProps, prevState) {
        if (prevState.propsEmails !== nextProps.emails) {
            return {
                propsEmails: nextProps.emails || [],
                emails: nextProps.emails || [],
                inputValue: '',
                focused: false,
            };
        }
        return null;
    };
    var findEmailAddress = function (value, isEnter) {
        var validateEmail = props.validateEmail;
        var validEmails = [];
        var findingInputValue = '';
        var re = /[ ,;]/g;
        var isEmail = validateEmail || isEmail_1.default;
        var addEmails = function (email) {
            var addingEmails = emails;
            for (var i = 0, l = emails.length; i < l; i++) {
                if (emails[i] === email) {
                    return false;
                }
            }
            validEmails.push(email);
            return true;
        };
        if (value !== '') {
            if (re.test(value)) {
                var splitData = value.split(re).filter(function (n) {
                    return n !== '' && n !== undefined && n !== null;
                });
                var setArr = new Set(splitData);
                var arr = setArr.slice();
                do {
                    if (isEmail('' + arr[0])) {
                        addEmails('' + arr.shift());
                    }
                    else {
                        if (arr.length === 1) {
                            /// 마지막 아이템이면 inputValue로 남겨두기
                            findingInputValue = '' + arr.shift();
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
                        findingInputValue = value;
                    }
                }
                else {
                    findingInputValue = value;
                }
            }
        }
        setEmails(emails.concat(validEmails));
        setInputValue(findingInputValue);
        if (validEmails.length && props.onChange) {
            props.onChange(emails.concat(validEmails));
        }
    };
    var onChangeInputValue = function (value) {
        findEmailAddress(value);
    };
    var removeEmail = function (index) {
    };
    var handleOnKeydown = function (e) {
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
    };
    var handleOnKeyup = function (e) {
        switch (e.which) {
            case 13:
            case 9:
                findEmailAddress(e.currentTarget.value, true);
                break;
            default:
        }
    };
    var handleOnChange = function (e) {
        return onChangeInputValue(e.currentTarget.value);
    };
    var handleOnBlur = function (e) {
        setFocused(false);
        findEmailAddress(e.currentTarget.value, true);
    };
    var handleOnFocus = function () {
        return setFocused(false);
    };
    var style = props.style, getLabel = props.getLabel, _d = props.className, className = _d === void 0 ? '' : _d, noClass = props.noClass, placeholder = props.placeholder;
    return (React.createElement("div", { className: className + " " + (noClass ? '' : 'react-multi-email') + " " + (focused ? 'focused' : '') + " " + (inputValue === '' && emails.length === 0 ? 'empty' : ''), style: style, onClick: function () {
            if (emailInputRef.current) {
                emailInputRef.current.focus();
            }
        } },
        placeholder ? React.createElement("span", { "data-placeholder": true }, placeholder) : null,
        emails.map(function (email, index) {
            return getLabel(email, index, removeEmail);
        }),
        React.createElement("input", { ref: emailInputRef, type: "text", value: inputValue, onFocus: handleOnFocus, onBlur: handleOnBlur, onChange: handleOnChange, onKeyDown: handleOnKeydown, onKeyUp: handleOnKeyup })));
};
exports.default = ReactMultiEmail;
