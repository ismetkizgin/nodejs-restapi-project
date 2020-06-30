const jwt = require('jsonwebtoken');
import { tokenMessage } from '../fixtures/messageStatus.json';

export const verifyToken = (req, res, next) => {
    const token = req.headers['token'] || req.body.token || req.query.token
    if (token) {
        jwt.verify(token, req.app.get('api_key'), (err, decoded) => {

            if (err) {
                res.json({ status: tokenMessage.Token_Invalid.status, message: tokenMessage.Token_Invalid.message })
            } else {
                req.decode = decoded,
                    next();
            }
        });

    } else {
        res.json({ status: tokenMessage.Token_Null.status, message: tokenMessage.Token_Null.message })
    }
};