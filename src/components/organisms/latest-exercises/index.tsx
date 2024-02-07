import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { ExerciseInfoCard } from '~/components/molecules/exercise-info-card';
import { styles } from '~/components/organisms/latest-exercises/styles';
import { useExercises } from '~/contexts/exercise-context';
import { useTheme } from '~/contexts/theme-context';

export const LatestExercises: React.FC = () => {
	const { colors } = useTheme();
	const { latestExercises, fetchLatestExercises } = useExercises();

	useEffect(() => {
		fetchLatestExercises();
	}, []);

	return (
		<View style={styles.container}>
			<Text style={{ ...styles.title, color: colors.text }}>Recente</Text>
			{latestExercises.length ? (
				<>
					{latestExercises.map((exercise) => {
						return <ExerciseInfoCard key={exercise.id} exercise={exercise} />;
					})}
				</>
			) : null}
		</View>
	);
};
