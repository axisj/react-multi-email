// forked from https://github.com/chriso/validator.js
const defaultFqdnOptions = {
    requireTld: true,
    allowUnderscores: false,
    allowTrailingDot: false,
};
const defaultEmailOptions = {
    allowDisplayName: false,
    requireDisplayName: false,
    allowUtf8LocalPart: true,
    requireTld: true,
};
const displayName = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\,\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\s]*<(.+)>$/i;
const emailUserPart = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
const quotedEmailUser = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
const emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
const quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
/* eslint-disable prefer-rest-params */
function isByteLength(str, options) {
    let min = 0;
    let max;
    const len = encodeURI(str).split(/%..|./).length - 1;
    if (options) {
        min = Number(options.min) || 0;
        max = Number(options.max);
    }
    return len >= min && (typeof max === 'undefined' || len <= max);
}
function isFQDN(str, options) {
    options = Object.assign({}, defaultFqdnOptions, options);
    /* Remove the optional trailing dot before checking validity */
    if (options.allowTrailingDot && str[str.length - 1] === '.') {
        str = str.substring(0, str.length - 1);
    }
    const parts = str.split('.');
    if (options.requireTld) {
        const tld = '' + parts.pop();
        if (!parts.length ||
            !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
            return false;
        }
        // disallow spaces
        if (/[\s\u2002-\u200B\u202F\u205F\u3000\uFEFF\uDB40\uDC20]/.test(tld)) {
            return false;
        }
    }
    for (let part, i = 0; i < parts.length; i++) {
        part = parts[i];
        if (options.allowUnderscores) {
            part = part.replace(/_/g, '');
        }
        if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)) {
            return false;
        }
        // disallow full-width chars
        if (/[\uff01-\uff5e]/.test(part)) {
            return false;
        }
        if (part[0] === '-' || part[part.length - 1] === '-') {
            return false;
        }
    }
    return true;
}
function isEmail(str, options) {
    options = Object.assign({}, defaultEmailOptions, options);
    if (options.requireDisplayName || options.allowDisplayName) {
        const displayEmail = str.match(displayName);
        if (displayEmail) {
            str = displayEmail[1];
        }
        else if (options.requireDisplayName) {
            return false;
        }
    }
    const parts = str.split('@');
    const domain = '' + parts.pop();
    const lowerDomain = domain.toLowerCase();
    let user = parts.join('@');
    if (lowerDomain === 'gmail.com' || lowerDomain === 'googlemail.com') {
        user = user.replace(/\./g, '').toLowerCase();
    }
    if (!isByteLength(user, { max: 64 }) || !isByteLength(domain, { max: 254 })) {
        return false;
    }
    if (!isFQDN(domain, { requireTld: options.requireTld })) {
        return false;
    }
    if (user[0] === '"') {
        user = user.slice(1, user.length - 1);
        return options.allowUtf8LocalPart
            ? quotedEmailUserUtf8.test(user)
            : quotedEmailUser.test(user);
    }
    const pattern = options.allowUtf8LocalPart
        ? emailUserUtf8Part
        : emailUserPart;
    const userParts = user.split('.');
    for (let i = 0; i < userParts.length; i++) {
        if (!pattern.test(userParts[i])) {
            return false;
        }
    }
    return true;
}
export default isEmail;
