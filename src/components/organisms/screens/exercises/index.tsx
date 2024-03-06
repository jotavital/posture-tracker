import { SimpleLineIcons } from '@expo/vector-icons';
import { parse } from 'date-fns';
import { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { AgendaList, CalendarProvider, ExpandableCalendar } from 'react-native-calendars';
import { Positions } from 'react-native-calendars/src/expandableCalendar';
import { Direction } from 'react-native-calendars/src/types';
import { ExerciseInfoCard } from '~/components/molecules/exercise-info-card';
import { styles } from '~/components/organisms/screens/exercises/styles';
import { useExercises } from '~/contexts/exercise-context';
import { useTheme } from '~/contexts/theme-context';
import { Exercise } from '~/entities/Exercise';
import { setCalendarLocales } from '~/lang/pt-BR/calendar';

export const ExercisesScreen: React.FC = () => {
	setCalendarLocales();

	const { colors } = useTheme();
	const { fetchExercisesByDate } = useExercises();
	const [selectedDate, setSelectedDate] = useState<string>(new Date().toDateString());
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [selectedDayExercises, setSelectedDayExercises] = useState<Exercise[]>([]);

	const handleChangeDate = async (date: string) => {
		setIsLoading(true);

		const parsedDate = parse(date, 'y-MM-dd', new Date());
		setSelectedDate(parsedDate.toDateString());

		const response = await fetchExercisesByDate(parsedDate);
		setSelectedDayExercises(response);

		setIsLoading(false);
	};

	return (
		<View style={{ ...styles.container }}>
			<CalendarProvider date={new Date().toDateString()} onDateChanged={handleChangeDate}>
				<ExpandableCalendar
					initialPosition={Positions.OPEN}
					markedDates={{
						'2024-03-05': { marked: true, selectedColor: colors.primary },
					}}
					renderArrow={(direction: Direction) => {
						if (direction === 'left') {
							return (
								<SimpleLineIcons
									name='arrow-left'
									size={18}
									color={colors.primary}
								/>
							);
						}

						return (
							<SimpleLineIcons name='arrow-right' size={18} color={colors.primary} />
						);
					}}
					theme={{
						selectedDayBackgroundColor: colors.primary,
					}}
					displayLoadingIndicator={isLoading}
				/>
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
								{isLoading ? (
									<ActivityIndicator />
								) : (
									<ExerciseInfoCard exercise={item} />
								)}
							</View>
						);
					}}
					// eslint-disable-next-line react-native/no-inline-styles
					contentContainerStyle={{ gap: 7 }}
				/>
			</CalendarProvider>
		</View>
	);
};
