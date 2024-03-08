import { View } from 'react-native';
import { CalendarProvider } from 'react-native-calendars';
import { ExercisesAgendaList } from '~/components/organisms/exercises-agenda-list';
import { ExercisesCalendar } from '~/components/organisms/exercises-calendar';
import { styles } from '~/components/organisms/screens/exercises/styles';
import { useTheme } from '~/contexts/theme-context';
import { useCalendarData } from '~/hooks/useCalendarData';
import { setCalendarLocales } from '~/lang/pt-BR/calendar';

export const ExercisesScreen: React.FC = () => {
	setCalendarLocales();

	const { colors } = useTheme();
	const { handleChangeMonth, handleChangeDate, isLoading, selectedDate, selectedDayExercises } =
		useCalendarData();

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
