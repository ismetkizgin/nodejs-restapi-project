let validator = require('validator');

export function isInt(data) { return data == null ? false : validator.isInt(data) };
export function isEmpty(data) { return data == null ? true : validator.isEmpty(data) };
export function isAlpha(data) { return data == null ? false : validator.isAlpha(data, ['tr-TR']) };
export function isMobilePhone(data) { return data == null ? false : validator.isMobilePhone(data, ['tr-TR']) };
export function isEmail(data) { return data == null ? false : validator.isEmail(data) };