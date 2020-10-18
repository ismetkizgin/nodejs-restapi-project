const joi = require('joi');
const HttpStatusCode = require('http-status-codes');

class InstitutionValidator {
    constructor() { }

    errorResponse = {
        status: HttpStatusCode.EXPECTATION_FAILED,
        message: 'Must have correct data entry.'
    }

    static async add(req, res, next) {
        try {
            await joi.object({
                InstitutionName: joi.string().min(3).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı]+$')).required(),
                InstitutionPhone: joi.string().min(11).max(11).pattern(new RegExp('^[0-9]+$')).required(),
                InstitutionEmail: joi.string().email().required(),
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(this.errorResponse.status).json(this.errorResponse.message);
        }
    }

    static async update(req, res, next) {
        try {
            await joi.object({
                InstitutionID: joi.number().min(1).max(99999999999).required(),
                InstitutionName: joi.string().min(3).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı]+$')).required(),
                InstitutionPhone: joi.string().min(11).max(11).pattern(new RegExp('^[0-9]+$')).required(),
                InstitutionEmail: joi.string().email().required(),
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(this.errorResponse.status).json(this.errorResponse.message);
        }
    }

    static async delete(req, res, next) {
        try {
            await joi.object({
                InstitutionID: joi.number().min(1).max(99999999999).required(),
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(this.errorResponse.status).json(this.errorResponse.message);
        }
    }
}

module.exports = InstitutionValidator;