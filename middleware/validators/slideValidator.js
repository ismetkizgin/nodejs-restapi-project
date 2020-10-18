const joi = require('joi');
const HttpStatusCode = require('http-status-codes');

class SlideValidator {
    constructor() { }

    errorResponse = {
        status: HttpStatusCode.EXPECTATION_FAILED,
        message: 'Must have correct data entry.'
    }

    static async sliderAdd(req, res, next) {
        try {
            await joi.object({
                SlideName: joi.string().min(3).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı]+$')).required(),
                SlidePicturePath: joi.string().required(),
            }).validateAsync(req.body);
            next();
        } catch (error) {
            res.status(this.errorResponse.status).json(this.errorResponse.message);
        }
    }
}

module.exports = SlideValidator;