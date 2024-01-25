import { openDatabase } from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

export const TodaysExercises: React.FC = () => {
	const [exercises, setExercises] = useState([]);
	const db = openDatabase('posture-tracker');

	useEffect(() => {
		db.exec([{ sql: 'SELECT * from exercises', args: [] }], false, (err, res) => {
			setExercises(res[0].rows);
		});
	}, []);

	return (
		<View>
			{exercises.length ? (
				<>
					{exercises.map((exercise) => {
						return <Text key={exercise.id}>{exercise.end_time}</Text>;
					})}
				</>
			) : null}
		</View>
	);
};
