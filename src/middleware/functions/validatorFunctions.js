let validator = require('validator');

export function isInt(value) { return value == null ? false : validator.isInt(value) };
export function isEmpty(value) { return value == null ? true : validator.isEmpty(value) };
export function isAlpha(value) { return value == null ? false : validator.isAlpha(value, ['tr-TR']) };
export function isMobilePhone(value) { return value == null ? false : validator.isMobilePhone(value, ['tr-TR']) };
export function isEmail(value) { return value == null ? false : validator.isEmail(value) };