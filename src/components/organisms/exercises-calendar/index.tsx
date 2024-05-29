import { parseISO } from 'date-fns';
import { useEffect } from 'react';
import { ExpandableCalendar } from 'react-native-calendars';
import { Positions } from 'react-native-calendars/src/expandableCalendar';
import { DateData, Direction } from 'react-native-calendars/src/types';
import { ExercisesCalendarArrows } from '~/components/organisms/exercises-calendar/arrows';
import { useExercisesCalendar } from '~/contexts/exercises-calendar-context';
import { useTheme } from '~/contexts/theme-context';

export const ExercisesCalendar: React.FC = () => {
	const { colors } = useTheme();

	const {
		handleFetchMarkedDates,
		markedDates,
		selectedDate,
		isLoading,
		handleFetchExercisesByDate,
	} = useExercisesCalendar();

	useEffect(() => {
		const currentDate = selectedDate ?? new Date();
		const month = currentDate.getMonth() + 1;

		handleFetchMarkedDates(month);
	}, [selectedDate]);

	return (
		<ExpandableCalendar
			initialPosition={Positions.OPEN}
			markedDates={markedDates}
			renderArrow={(direction: Direction) => (
				<ExercisesCalendarArrows direction={direction} />
			)}
			theme={{
				calendarBackground: colors.background,
				selectedDayBackgroundColor: colors.primary,
				monthTextColor: colors.text,
				dayTextColor: colors.text,
				textDisabledColor: colors.disabledText,
			}}
			displayLoadingIndicator={isLoading}
			onDayPress={(date: DateData) => {
				handleFetchExercisesByDate(parseISO(date.dateString));
			}}
		/>
	);
};
