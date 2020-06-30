import { isEmpty } from '../functions/validatorFunctions'
import { validateMessage } from '../../fixtures/messageStatus.json'

module.exports = {
	sliderAdd: async (req, res, next) => {
		const body = req.body;
		const state = !isEmpty(body.SlidePicturePath)
			&& !isEmpty(body.SlideName)
		if (state)
			next();
		else
			res.send({ status: validateMessage.status, message: validateMessage.message });
	}
}