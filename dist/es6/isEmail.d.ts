export interface IFqdnOptions {
    requireTld?: boolean;
    allowUnderscores?: boolean;
    allowTrailingDot?: boolean;
}
export interface IEmailOptions {
    allowDisplayName?: boolean;
    requireDisplayName?: boolean;
    allowUtf8LocalPart?: boolean;
    requireTld?: boolean;
}
declare function isEmail(str: string, options?: IEmailOptions): boolean;
export default isEmail;
