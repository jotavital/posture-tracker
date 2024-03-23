import React from 'react';
import { View } from 'react-native';
import { AgendaList } from 'react-native-calendars';
import { RefreshControl } from 'react-native-gesture-handler';
import { ExerciseInfoCard } from '~/components/molecules/exercise-info-card';
import { useExercisesCalendar } from '~/contexts/exercises-calendar-context';
import { useTheme } from '~/contexts/theme-context';
import { Exercise } from '~/entities/Exercise';

export const ExercisesAgendaList: React.FC = () => {
	const { colors } = useTheme();
	const { selectedDate, selectedDayExercises, isLoading, handleFetchExercisesByDate } =
		useExercisesCalendar();

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
			theme={{
				calendarBackground: colors.background,
			}}
			refreshControl={
				<RefreshControl
					refreshing={isLoading}
					onRefresh={() => handleFetchExercisesByDate(selectedDate)}
				/>
			}
		/>
	);
};
