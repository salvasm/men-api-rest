import config from "@config/global";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userModel from '@components/user/user.model';
import { Request, Response } from 'express';
import { apiResponse } from "@interfaces/global";

/**
 * Check user exists on DB and the password is correct
 * @param {string} username User name
 * @param {string} password User password
 * @returns {Promise<apiResponse>} User token
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
            result: {
                token: token,
                role: payload.role
            }
        }
    } else {
        return {
            success: false,
            status: 401,
            message: 'Unauthorized'
        }
    }
}

/**
 * Close all sessions and connections relatives to current user
 * @param {string} username Username to logout
 * @returns {Promise<apiResponse>} JSON with action result
 */
export const unauthentication = async (req: Request) : Promise<apiResponse> => {
    var result = {
        success: true,
        status: 200,
        message: 'User logged out succesfuly'
    };

    req.session.destroy((err: any) => {
        if (err) {
            result = {
                success: false,
                status: 500,
                message: 'Some error occured during logged out'
            };
        }
    });

    return result;
}