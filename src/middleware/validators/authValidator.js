import { validateMessage } from '../../fixtures/messageStatus.json';
import joi from 'joi';

module.exports = {
    login: async (req, res, next) => {
        try {
            const loginSchema = joi.object({
               UserIdentityNo: joi.number().min(10000000000).max(99999999999).required(),
               UserPassword: joi.string().max(99).required()
            });
            await loginSchema.validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).send({ message: validateMessage.message });
        }
    },

    signUp: async (req, res, next) => {
        try {
            const signUpSchema = joi.object({
                UserFirstName:joi.string().min(3).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı]+$')).required(),
                UserLastName:joi.string().min(3).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı]+$')).required(),
                UserIdentityNo: joi.number().min(10000000000).max(99999999999).required(),
                UserEmail: joi.string().email().required(),
                UserPassword: joi.string().max(99).required(),
                UserPhone: joi.string().min(11).max(11).pattern(new RegExp('^[0-9]+$')).required(),
                UserAdressCity: joi.string().min(3).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı]+$')).required(),
                UserAdressDistrict: joi.string().min(3).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı]+$')).required(),
                UserAdressStreet: joi.string().min(3).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı]+$')).required(),
                UserAdressApartmentName: joi.string().min(3).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı]+$')).required(),
                UserAdressNo: joi.number().required(),
                UserFamilyPeopleCount: joi.number().required()
            });
            await signUpSchema.validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).send({ message: validateMessage.message });
        }
    },

    deleteMyAccount: async (req, res, next) => {
        try {
            const deleteSchema = joi.object({
                UserIdentityNo: joi.number().min(10000000000).max(99999999999).required(),
            });
            await deleteSchema.validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).send({ message: validateMessage.message });
        }
    }
}