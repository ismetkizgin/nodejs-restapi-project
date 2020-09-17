import { isEmpty } from '../functions/validatorFunctions'
import { validateMessage } from '../../fixtures/messageStatus.json'

module.exports = {
    add: async (req, res, next) => {
        const body = req.body;
        const state = !isEmpty(body.InstitutionName)
            && !isEmpty(body.InstitutionNo) && !isEmpty(body.InstitutionEmail);
        if (state)
            next();
        else
            res.status(validateMessage.status).send({ message: validateMessage.message });
    },
    update: async (req, res, next) => {
        const body = req.body;
        const state = !isEmpty(body.InstitutionID) && !isEmpty(body.InstitutionName)
            && !isEmpty(body.InstitutionNo) && !isEmpty(body.InstitutionEmail);
        if (state)
            next();
        else
            res.status(validateMessage.status).send({ message: validateMessage.message });
    },
    delete: async (req, res, next) => {
        const body = req.body;
        const state = !isEmpty(body.InstitutionID);
        if (state)
            next();
        else
            res.status(validateMessage.status).send({ message: validateMessage.message });
    }
};