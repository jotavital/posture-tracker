import { parse } from 'date-fns';
import { ReactNode, createContext, useContext, useState } from 'react';
import { DateData, MarkedDates } from 'react-native-calendars/src/types';
import { useExercises } from '~/contexts/exercise-context';
import { Exercise } from '~/entities/Exercise';

export interface ExercisesCalendarContextValue {
	markedDates: MarkedDates;
	isLoading: boolean;
	handleFetchMarkedDates: (month: number) => Promise<void>;
	selectedDate: string;
	selectedDayExercises: Exercise[];
	handleChangeDate: (date: string) => Promise<void>;
	handleChangeMonth: ({ month }: DateData) => void;
}

const ExercisesCalendarContext = createContext<ExercisesCalendarContextValue>(
	{} as ExercisesCalendarContextValue,
);

export const ExercisesCalendarProvider = ({ children }: { children: ReactNode }) => {
	const [markedDates, setMarkedDates] = useState<MarkedDates>({});
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { fetchDatesThatHaveExercises, fetchExercisesByDate } = useExercises();
	const [selectedDate, setSelectedDate] = useState<string>(new Date().toDateString());
	const [selectedDayExercises, setSelectedDayExercises] = useState<Exercise[]>([]);

	const handleChangeDate = async (date: string) => {
		setIsLoading(true);

		const parsedDate = parse(date, 'y-MM-dd', new Date());
		setSelectedDate(parsedDate.toDateString());
		console.log('rodou', parsedDate.toDateString());

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

	return (
		<ExercisesCalendarContext.Provider
			value={{
				markedDates,
				isLoading,
				handleFetchMarkedDates,
				selectedDate,
				selectedDayExercises,
				handleChangeDate,
				handleChangeMonth,
			}}
		>
			{children}
		</ExercisesCalendarContext.Provider>
	);
};

export const useExercisesCalendar = () => {
	const context = useContext(ExercisesCalendarContext);

	if (Object.keys(context).length) {
		return context;
	}

	throw 'Trying to use useExercisesCalendar outside of provider';
};
