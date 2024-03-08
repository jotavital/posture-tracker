import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { AgendaList } from 'react-native-calendars';
import { ExerciseInfoCard } from '~/components/molecules/exercise-info-card';
import { useTheme } from '~/contexts/theme-context';
import { Exercise } from '~/entities/Exercise';

interface Props {
	selectedDate: string;
	selectedDayExercises: Exercise[];
	isLoading: boolean;
}

export const ExercisesAgendaList: React.FC<Props> = ({
	selectedDate,
	selectedDayExercises,
	isLoading,
}: Props) => {
	const { colors } = useTheme();

	return (
		<AgendaList
			sections={[
				{
					title: new Date(selectedDate).toDateString(),
					data: selectedDayExercises,
				},
			]}
			renderItem={({ item }: { item: Exercise }) => {
				return (
					// eslint-disable-next-line react-native/no-inline-styles
					<View style={{ paddingHorizontal: 7 }}>
						<ExerciseInfoCard exercise={item} />
					</View>
				);
			}}
			// eslint-disable-next-line react-native/no-inline-styles
			contentContainerStyle={{ gap: 7 }}
			ListHeaderComponent={isLoading ? <ActivityIndicator /> : null}
			theme={{
				calendarBackground: colors.background,
			}}
		/>
	);
};
