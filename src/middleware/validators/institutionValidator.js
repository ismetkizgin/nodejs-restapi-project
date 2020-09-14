import { isEmpty } from '../functions/validatorFunctions'
import { validateMessage } from '../../fixtures/messageStatus.json'

module.exports = {
    institutionAdd: async (req, res, next) => {
        const body = req.body;
        const state = !isEmpty(body.StateAgencyName)
            && !isEmpty(body.StateAgencyNo) && !isEmpty(body.StateAgencyEmail);
        if (state)
            next();
        else
            res.status(validateMessage.status).send({ message: validateMessage.message });
    },
    institutionUpdate: async (req, res, next) => {
        const body = req.body;
        const state = !isEmpty(body.StateAgencyID) && !isEmpty(body.StateAgencyName)
            && !isEmpty(body.StateAgencyNo) && !isEmpty(body.StateAgencyEmail);
        if (state)
            next();
        else
            res.status(validateMessage.status).send({ message: validateMessage.message });
    }
};