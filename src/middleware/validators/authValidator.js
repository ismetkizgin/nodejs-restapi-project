import { isAlpha, isEmail, isEmpty, isInt, isMobilePhone } from '../functions/validatorFunctions';
import { validateMessage } from '../../fixtures/messageStatus.json';
import joi from 'joi';

module.exports = {
    login: async (req, res, next) => {
        try {
            const loginSchema = joi.object({
               UserIdentityNo: joi.number().min(10000000000).max(99999999999).required(),
               UserPassword: joi.string().required()
            });
            await loginSchema.validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).send({ message: validateMessage.message });
        }
    },

    signUp: (req, res, next) => {
        const body = req.body;
        const state = (isAlpha(body.UserFirstName))
            && (isAlpha(body.UserLastName))
            && (isInt(body.UserIdentityNo))
            && (isEmail(body.UserEmail))
            && (isMobilePhone(body.UserPhone))
            && !(isEmpty(body.UserPassword))
            && !(isEmpty(body.UserAdressCity))
            && !(isEmpty(body.UserAdressDistrict))
            && !(isEmpty(body.UserAdressStreet))
            && (isInt(body.UserAdressNo))
            && !(isEmpty(body.UserAdressApartmentName))
            && (isInt(body.UserFamilyPeopleCount));

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