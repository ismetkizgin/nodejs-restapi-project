const joi = require('joi');
const HttpStatusCode = require('http-status-codes');

class AuthValidator {
    constructor() { }

    errorResponse = {
        status: HttpStatusCode.EXPECTATION_FAILED,
        message: 'Must have correct data entry.'
    }

    static async login(req, res, next) {
        try {
            await joi.object({
                UserIdentityNo: joi.number().min(10000000000).max(99999999999).required(),
                UserPassword: joi.string().max(99).required()
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(this.errorResponse.status).json(this.errorResponse.message);
        }
    }

    static async signUp(req, res, next) {
        try {
            await joi.object({
                UserFirstName: joi.string().min(3).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı]+$')).required(),
                UserLastName: joi.string().min(3).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı]+$')).required(),
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
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(this.errorResponse.status).json(this.errorResponse.message);
        }
    }

    static async deleteMyAccount(req, res, next) {
        try {
            await joi.object({
                UserIdentityNo: joi.number().min(10000000000).max(99999999999).required(),
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(this.errorResponse.status).json(this.errorResponse.message);
        }
    }
}

module.exports = AuthValidator;