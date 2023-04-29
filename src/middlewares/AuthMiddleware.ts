import dotenv from 'dotenv';
dotenv.config();

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AuthConstants from '../constants/AuthConstants';

const secret = process.env.SECRET_JWT;

export default async function (request: Request, response: Response, next: NextFunction) {
	try {
		const tokenHeader = request.headers['authorization'];
		const token = tokenHeader && tokenHeader.split(' ')[1];

		if (!token) {
			return response.send({
				status: 'error',
				message: AuthConstants.authUnauthorized
			});
		}

		try {
			jwt.verify(token, secret);
			next();
		} catch (error) {
			return response.send({
				status: 'error',
				message: AuthConstants.authInvalidToken
			});
		}
	} catch (error) {
		return {
			status: 'error',
			message: error
		};
	}
}
