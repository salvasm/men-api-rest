import config from "@config/global";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userModel from '@components/user/user.model';
import { Request } from 'express';
import { apiResponse } from "@interfaces/global";
import { JSONresponse } from "@api/components/helpers";

/**
 * Check user exists on DB and the password is correct
 * @param {string} username User name
 * @param {string} password User password
 * @returns {Promise<apiResponse>} User token
 */
export const authentication = async (req: Request) : Promise<apiResponse> => {

    req.body.user, req.body.password
    var user = await userModel.findOne({username: req.body.username}).select({ 'password': 1, 'role':1 });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        /* JWT */
        const payload = {
            id: user.id,
            username: req.body.username,
            role: user.role
        }
        const token = jwt.sign(payload, config.jwt.secret);
        
        /* Session */
        req.session.username = req.body.user;
        req.session.role = user.role;

        return JSONresponse(true, 200, token);
    } else {
        return JSONresponse(false, 401, 'Unauthorized');
    }
}

/**
 * Close all sessions and connections relatives to current user
 * @param {string} username Username to logout
 * @returns {Promise<apiResponse>} JSON with action result
 */
export const unauthentication = async (req: Request) : Promise<apiResponse> => {
    var result = JSONresponse(true, 200, 'User logged out succesfuly');

    req.session.destroy((err: any) => {
        if (err) {
            result = JSONresponse(false, 500, 'Some error occured during logged out');
        }
    });

    return result;
}
