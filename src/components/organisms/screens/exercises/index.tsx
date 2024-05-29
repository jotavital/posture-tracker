import { View } from 'react-native';
import { CalendarProvider } from 'react-native-calendars';
import { ExercisesAgendaList } from '~/components/organisms/exercises-agenda-list';
import { ExercisesCalendar } from '~/components/organisms/exercises-calendar';
import { styles } from '~/components/organisms/screens/exercises/styles';
import { useExercisesCalendar } from '~/contexts/exercises-calendar-context';
import { useTheme } from '~/contexts/theme-context';
import { setCalendarLocales } from '~/lang/pt-BR/calendar';

export const ExercisesScreen: React.FC = () => {
	setCalendarLocales();

	const { colors } = useTheme();
	const { handleChangeMonth } = useExercisesCalendar();

	return (
		<View style={{ ...styles.container }} key={`${JSON.stringify(colors)}`}>
			<CalendarProvider date={new Date().toDateString()} onMonthChange={handleChangeMonth}>
				<ExercisesCalendar />
				<ExercisesAgendaList />
			</CalendarProvider>
		</View>
	);
};
