import * as React from 'react';
export interface IReactMultiEmailProps {
    emails?: string[];
    onChange?: (emails: string[]) => void;
    noClass?: boolean;
    validateEmail?: (email: string) => boolean;
    style?: object;
    getLabel: (email: string, index: number, removeEmail: (index: number) => void) => void;
    className?: string;
    placeholder?: string | React.ReactNode;
}
export interface IReactMultiEmailState {
    focused?: boolean;
    propsEmails?: string[];
    emails: string[];
    inputValue?: string;
}
declare class ReactMultiEmail extends React.Component<IReactMultiEmailProps, IReactMultiEmailState> {
    state: {
        focused: boolean;
        emails: any[];
        inputValue: string;
    };
    emailInputRef: React.RefObject<HTMLInputElement>;
    static getDerivedStateFromProps(nextProps: IReactMultiEmailProps, prevState: IReactMultiEmailState): {
        propsEmails: string[];
        emails: string[];
        inputValue: string;
        focused: boolean;
    };
    constructor(props: IReactMultiEmailProps);
    findEmailAddress: (value: string, isEnter?: boolean) => void;
    onChangeInputValue: (value: string) => void;
    removeEmail: (index: number) => void;
    handleOnKeydown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    handleOnKeyup: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    handleOnChange: (e: React.SyntheticEvent<HTMLInputElement>) => void;
    handleOnBlur: (e: React.SyntheticEvent<HTMLInputElement>) => void;
    handleOnFocus: () => void;
    render(): JSX.Element;
}
export default ReactMultiEmail;
