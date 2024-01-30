import React from 'react';
import { Text, View } from 'react-native';
import { useExercises } from '~/contexts/exercise-context';

export const TodaysExercises: React.FC = () => {
	const { exercises } = useExercises();

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
