import React, { useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
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

	return latestExercises.length ? (
		<View style={styles.container}>
			<Text style={{ ...styles.title, color: colors.text }}>Recente</Text>
			<FlatList
				data={latestExercises}
				renderItem={({ item }) => <ExerciseInfoCard exercise={item} />}
				keyExtractor={(item) => String(item.id)}
			/>
		</View>
	) : null;
};
