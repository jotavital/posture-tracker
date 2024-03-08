import { parse } from 'date-fns';
import { useState } from 'react';
import { DateData, MarkedDates } from 'react-native-calendars/src/types';
import { useExercises } from '~/contexts/exercise-context';
import { Exercise } from '~/entities/Exercise';

export const useCalendarData = () => {
	const [markedDates, setMarkedDates] = useState<MarkedDates>({});
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { fetchDatesThatHaveExercises, fetchExercisesByDate } = useExercises();
	const [selectedDate, setSelectedDate] = useState<string>(new Date().toDateString());
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

	return {
		markedDates,
		isLoading,
		handleFetchMarkedDates,
		selectedDate,
		selectedDayExercises,
		handleChangeDate,
		handleChangeMonth,
	};
};
