import config from "@config/global";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userModel from '@components/user/user.model';
import { apiResponse } from "@interfaces/global";

/**
 * Check user exists on DB and the password is correct
 * @param {string} username User name
 * @param {string} password User password
 * @returns {Promise<apiReponse>} User token
 */
export const authentication = async (username: string, password: string) : Promise<apiResponse> => {
    var user = await userModel.findOne({username: username}).select({ 'password': 1, 'role':1 });
    if (user && bcrypt.compareSync(password, user.password)) {
        /* JWT */
        const payload = {
            id: user.id,
            username: username,
            role: user.role
        }
        const token = jwt.sign(payload, config.jwt.secret);
        
        return {
            success: true,
            status: 200,
            result: token
        }
    } else {
        return {
            success: false,
            status: 401,
            message: 'Unauthorized'
        }
    }
}
