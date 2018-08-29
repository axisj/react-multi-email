import * as React from 'react';
export interface IReactMultiEmailProps {
    emails?: string[];
    onChange?: (emails: string[]) => void;
    style?: object;
    getLabel: (email: string, index: number, removeEmail: (index: number) => void) => void;
}
export interface IReactMultiEmailState {
    focused?: boolean;
    propsEmails?: string[];
    emails?: string[];
    inputValue?: string;
}
declare class ReactMultiEmail extends React.Component<IReactMultiEmailProps> {
    state: {
        focused: boolean;
        emails: any[];
        inputValue: string;
    };
    private emailInput;
    static getDerivedStateFromProps(nextProps: IReactMultiEmailProps, prevState: IReactMultiEmailState): {
        propsEmails: string[];
        emails: string[];
        inputValue: string;
        focused: boolean;
    };
    findEmailAddress: (value: string, isEnter?: boolean) => void;
    onChangeInputValue: (value: string) => void;
    removeEmail: (index: number) => void;
    render(): JSX.Element;
}
export default ReactMultiEmail;
