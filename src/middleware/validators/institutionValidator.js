import { validateMessage } from '../../fixtures/messageStatus.json'
import joi from "joi/lib/index";

module.exports = {
    add: async (req, res, next) => {
        try {
            await joi.object({
                InstitutionName:joi.string().min(3).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı]+$')).required(),
                InstitutionPhone:joi.string().min(11).max(11).pattern(new RegExp('^[0-9]+$')).required(),
                InstitutionEmail:joi.string().email().required(),
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).send({ message: validateMessage.message });
        }
    },
    update: async (req, res, next) => {
        try {
            await joi.object({
                InstitutionID:joi.number().min(1).max(99999999999).required(),
                InstitutionName:joi.string().min(3).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı]+$')).required(),
                InstitutionPhone:joi.string().min(11).max(11).pattern(new RegExp('^[0-9]+$')).required(),
                InstitutionEmail:joi.string().email().required(),
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).send({ message: validateMessage.message });
        }
    },
    delete: async (req, res, next) => {
        try {
            await joi.object({
                InstitutionID:joi.number().min(1).max(99999999999).required(),
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).send({ message: validateMessage.message });
        }
    }
};