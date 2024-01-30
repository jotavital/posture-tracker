import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { dataSource } from '~/database';
import { Exercise } from '~/entities/Exercise';

interface ExerciseProviderProps {
	children: ReactNode;
}

interface ExerciseContextValue {
	exercises: Exercise[];
	fetchExercises: () => void;
	storeExercise: (data: Exercise) => void;
}

const ExerciseContext = createContext<ExerciseContextValue>({} as ExerciseContextValue);

export const ExerciseProvider = ({ children }: ExerciseProviderProps) => {
	const [exercises, setExercises] = useState<Exercise[]>([]);

	const fetchExercises = async () => {
		const db = await dataSource();

		db.getRepository(Exercise)
			.find()
			.then((response) => setExercises(response));
	};

	const storeExercise = async (data: Exercise) => {
		const db = await dataSource();

		const exercise = await db.getRepository(Exercise).save(data);

		setExercises((prevState) => [...prevState, exercise]);
	};

	useEffect(() => {
		fetchExercises();
	}, []);

	return (
		<ExerciseContext.Provider value={{ exercises, fetchExercises, storeExercise }}>
			{children}
		</ExerciseContext.Provider>
	);
};

export const useExercises = () => {
	const context = useContext(ExerciseContext);

	if (Object.keys(context).length) {
		return context;
	}

	throw 'Trying to use useExercises outside of provider';
};
