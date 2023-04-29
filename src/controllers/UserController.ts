import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default {
	async create(request: Request, response: Response) {
		try {
			const userData = request.body;

			const createUser = await UserService.create(userData);

			return response.send(createUser);
		} catch (error) {
			return response.send({
				status: 'error',
				message: error
			});
		}
	},
	async get(request: Request, response: Response) {
		try {
			const {
				id,
				username
			} = request.body;

			const getUser = await UserService.get({ id, username });

			return response.send(getUser);
		} catch (error) {
			return response.send({
				status: 'error',
				message: error
			});
		}
	},
	async update(request: Request, response: Response) {
		try {
			//
		} catch (error) {
			return response.send({
				status: 'error',
				message: error
			});
		}
	},
	async delete(request: Request, response: Response) {
		try {
			//
		} catch (error) {
			return response.send({
				status: 'error',
				message: error
			});
		}
	}
};