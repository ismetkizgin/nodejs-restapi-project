import { validateMessage } from '../../fixtures/messageStatus.json'
import joi from "joi/lib/index";

module.exports = {
	sliderAdd: async (req, res, next) => {
        try {
            const addSchema = joi.object({
                SlideName:joi.string().min(3).pattern(new RegExp('^[A-Za-zÇçÖöŞşÜüĞğİı]+$')).required(),
                SlidePicturePath:joi.string().required(),
            });
            await addSchema.validateAsync(req.body);
            next();
        } catch (error) {
            res.status(validateMessage.status).send({ message: validateMessage.message });
        }
	}
}