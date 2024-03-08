import { parse } from 'date-fns';
import { useState } from 'react';
import { View } from 'react-native';
import { CalendarProvider } from 'react-native-calendars';
import { DateData } from 'react-native-calendars/src/types';
import { ExercisesAgendaList } from '~/components/organisms/exercises-agenda-list';
import { ExercisesCalendar } from '~/components/organisms/exercises-calendar';
import { styles } from '~/components/organisms/screens/exercises/styles';
import { useExercises } from '~/contexts/exercise-context';
import { useTheme } from '~/contexts/theme-context';
import { Exercise } from '~/entities/Exercise';
import { useCalendarData } from '~/hooks/useCalendarData';
import { setCalendarLocales } from '~/lang/pt-BR/calendar';

export const ExercisesScreen: React.FC = () => {
	setCalendarLocales();

	const { colors } = useTheme();
	const { fetchExercisesByDate } = useExercises();
	const { handleFetchMarkedDates } = useCalendarData();
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
				<ExercisesCalendar selectedDate={selectedDate} isLoading={isLoading} />
				<ExercisesAgendaList
					isLoading={isLoading}
					selectedDate={selectedDate}
					selectedDayExercises={selectedDayExercises}
				/>
			</CalendarProvider>
		</View>
	);
};
