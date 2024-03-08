import { useState } from 'react';
import { MarkedDates } from 'react-native-calendars/src/types';
import { useExercises } from '~/contexts/exercise-context';

export const useCalendarData = () => {
	const [markedDates, setMarkedDates] = useState<MarkedDates>({});
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { fetchDatesThatHaveExercises } = useExercises();

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

	return { markedDates, isLoading, handleFetchMarkedDates };
};
