import { isEmpty } from '../functions/validatorFunctions'

module.exports = {
	sliderAdd: async (req, res, next) => {
		const body = req.body;
		const state = !isEmpty(body.SlidePicturePath)
			&& !isEmpty(body.SlideName)
		if (state)
			next();
		else
			res.send({ status: false, message: 'Must have correct data entry' });
	}
}