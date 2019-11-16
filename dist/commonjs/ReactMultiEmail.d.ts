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
declare const ReactMultiEmail: (props: IReactMultiEmailProps) => JSX.Element;
export default ReactMultiEmail;
