import { parse } from 'date-fns';
import { useState } from 'react';
import { View } from 'react-native';
import { CalendarProvider } from 'react-native-calendars';
import { DateData, MarkedDates } from 'react-native-calendars/src/types';
import { ExercisesAgendaList } from '~/components/organisms/exercises-agenda-list';
import { ExercisesCalendar } from '~/components/organisms/exercises-calendar';
import { styles } from '~/components/organisms/screens/exercises/styles';
import { useExercises } from '~/contexts/exercise-context';
import { useTheme } from '~/contexts/theme-context';
import { Exercise } from '~/entities/Exercise';
import { setCalendarLocales } from '~/lang/pt-BR/calendar';

export const ExercisesScreen: React.FC = () => {
	setCalendarLocales();

	const { colors } = useTheme();
	const { fetchExercisesByDate, fetchDatesThatHaveExercises } = useExercises();
	const [selectedDate, setSelectedDate] = useState<string>(new Date().toDateString());
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [selectedDayExercises, setSelectedDayExercises] = useState<Exercise[]>([]);
	const [markedDates, setMarkedDates] = useState<MarkedDates>({});

	const handleFetchMarkedDates = async (month: number) => {
		setIsLoading(true);

		const datesThatHaveExercises = await fetchDatesThatHaveExercises(month.toString());

		let newMarkedDates: MarkedDates = {};

		datesThatHaveExercises.map(({ date }) => {
			newMarkedDates = {
				...newMarkedDates,
				[date]: {
					marked: true,
				},
			};
		});

		setMarkedDates(newMarkedDates);
		setIsLoading(false);
	};

	const handleChangeDate = async (date: string) => {
		setIsLoading(true);

		const parsedDate = parse(date, 'y-MM-dd', new Date());
		setSelectedDate(parsedDate.toDateString());

		const response = await fetchExercisesByDate(parsedDate);
		setSelectedDayExercises(response);

		setIsLoading(false);
	};

	const handleChangeMonth = ({ month }: DateData) => {
		handleFetchMarkedDates(month);
	};

	return (
		<View style={{ ...styles.container }} key={`${JSON.stringify(colors)}`}>
			<CalendarProvider
				date={new Date().toDateString()}
				onDateChanged={handleChangeDate}
				onMonthChange={handleChangeMonth}
			>
				<ExercisesCalendar
					selectedDate={selectedDate}
					handleFetchMarkedDates={handleFetchMarkedDates}
					isLoading={isLoading}
					markedDates={markedDates}
				/>
				<ExercisesAgendaList
					isLoading={isLoading}
					selectedDate={selectedDate}
					selectedDayExercises={selectedDayExercises}
				/>
			</CalendarProvider>
		</View>
	);
};
