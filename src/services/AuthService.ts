import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import AuthConstants from '../constants/AuthConstants';
import UserRepository from '../repositories/UserRepository';
import AuthRepository from '../repositories/AuthRepository';

interface IAuthProps {
	username: string;
	password: string;
}

const secret = process.env.SECRET_JWT;

export default {
	async auth({ username, password }: IAuthProps) {
		try {
			if (!username || !password) {
				return {
					status: 'error',
					message: AuthConstants.authNullInput
				};
			}

			const checkUserExist = await UserRepository.get({ type: 'username', key: username });

			if (!checkUserExist) {
				return {
					status: 'error',
					message: AuthConstants.userNotSubscribed
				};
			}

			const getHash = await AuthRepository.get(username);

			const validate = await bcrypt.compare(password, getHash);

			if (!validate) {
				return {
					status: 'error',
					message: AuthConstants.authUnauthorized
				};
			}

			const token = jwt.sign({ username }, secret);

			return {
				status: 'success',
				message: AuthConstants.authSuccess,
				data: {
					token
				}
			};
		} catch (error) {
			return {
				status: 'error',
				message: error
			};
		}
	}
};