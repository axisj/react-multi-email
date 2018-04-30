/// <reference types="react" />
import * as React from 'react';
export interface IReactMultiEmailProps {
    emails?: string[];
    onChange?: (emails: any) => void;
    style?: object;
    getLabel: Function;
}
export interface IReactMultiEmailState {
    focused?: boolean;
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
