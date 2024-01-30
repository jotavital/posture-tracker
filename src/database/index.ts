import { DataSource } from 'typeorm';
import { Exercise } from '~/entities/Exercise';

export const dataSource = () =>
	new DataSource({
		database: 'posture-tracker',
		driver: require('expo-sqlite'),
		entities: [Exercise],
		synchronize: true,
		type: 'expo',
	}).initialize();
