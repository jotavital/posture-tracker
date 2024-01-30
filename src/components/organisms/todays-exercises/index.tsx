import React from 'react';
import { View } from 'react-native';
import { ExerciseListItem } from '~/components/molecules/exercise-list-item';
import { styles } from '~/components/organisms/todays-exercises/styles';
import { useExercises } from '~/contexts/exercise-context';

export const TodaysExercises: React.FC = () => {
	const { exercises } = useExercises();

	return (
		<View style={styles.container}>
			{exercises.length ? (
				<>
					{exercises.map((exercise) => {
						return <ExerciseListItem key={exercise.id} exercise={exercise} />;
					})}
				</>
			) : null}
		</View>
	);
};
