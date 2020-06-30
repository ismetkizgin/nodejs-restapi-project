import { isAlpha, isEmail, isEmpty, isInt, isMobilePhone } from '../functions/validatorFunctions'
import { validateMessage } from '../../fixtures/messageStatus.json'

module.exports = {
    login: (req, res, next) => {
        if (isInt(req.body.UserIdentityNo) && !isEmpty(req.body.UserPassword))
            next();
        else
            res.status(validateMessage.status).send({ message: validateMessage.message });
    },

    all: (req, res, next) => {
        const body = req.body;
        const state = (isAlpha(body.UserFirstName))
            && (isAlpha(body.UserLastName))
            && (isInt(body.UserIdentityNo))
            && (isEmail(body.UserEmail))
            && (isMobilePhone(body.UserPhone))
            && !(isEmpty(body.UserPassword))
            && (isInt(body.UserStatusID));

        if (state)
            next();
        else
            res.status(validateMessage.status).send({ message: validateMessage.message });
    },

    deleteMyAccount: (req, res, next) => {
        if (isInt(req.body.UserIdentityNo))
            next();
        else
            res.status(validateMessage.status).send({ message: validateMessage.message });
    }
}