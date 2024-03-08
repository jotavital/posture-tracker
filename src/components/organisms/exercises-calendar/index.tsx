import { useEffect } from 'react';
import { ExpandableCalendar } from 'react-native-calendars';
import { Positions } from 'react-native-calendars/src/expandableCalendar';
import { Direction, MarkedDates } from 'react-native-calendars/src/types';
import { ExercisesCalendarArrows } from '~/components/organisms/exercises-calendar/arrows';
import { useTheme } from '~/contexts/theme-context';

interface Props {
	selectedDate: string;
	handleFetchMarkedDates: (month: number) => void;
	markedDates: MarkedDates;
	isLoading: boolean;
}

export const ExercisesCalendar: React.FC<Props> = ({
	selectedDate,
	handleFetchMarkedDates,
	markedDates,
	isLoading,
}: Props) => {
	const { colors } = useTheme();

	useEffect(() => {
		const currentDate = selectedDate ? new Date(selectedDate) : new Date();
		const month = currentDate.getMonth() + 1;

		handleFetchMarkedDates(month);
	}, []);

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
		/>
	);
};
