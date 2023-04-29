import { prisma } from '../database';

interface ICreateUserProps {
	username: string;
	name: string;
	image_profile?: string;
	password_hash: string;
}

interface IGetUserProps {
	type: 'id' | 'username';
	key: string;
}

export default {
	async create({
		username,
		name,
		image_profile,
		password_hash
	}: ICreateUserProps) {
		try {
			await prisma.user.create({
				data: {
					username,
					name,
					image_profile,
					User_Auth: {
						create: {
							password_hash
						}
					}
				}
			});

			return 'success';
		} catch (error) {
			return 'error';
		}
	},
	async get({ type, key }: IGetUserProps) {
		try {
			if (type === 'id') {
				const getUser = await prisma.user.findFirst({
					where: {
						id: {
							equals: key
						}
					}
				});

				return getUser;
			}

			if (type === 'username') {
				const getUser = await prisma.user.findFirst({
					where: {
						username: {
							equals: key
						}
					}
				});

				return getUser;
			}

			return 'error';
		} catch (error) {
			return 'error';
		}
	},
	async update() {
		try {
			//
		} catch (error) {
			return 'error';
		}
	},
	async delete() {
		try {
			//
		} catch (error) {
			return 'error';
		}
	}
};