import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { dataSource } from '~/database';
import { Exercise } from '~/entities/Exercise';

interface ExerciseContextValue {
	exercises: Exercise[];
	fetchExercises: () => void;
	storeExercise: (data: Exercise) => void;
	isDeleteModalVisible: boolean;
	handleOpenDeleteModal: (exerciseId: number) => void;
	handleCloseDeleteModal: () => void;
	deleteExercise: () => void;
}

const ExerciseContext = createContext<ExerciseContextValue>({} as ExerciseContextValue);

export const ExerciseProvider = ({ children }: { children: ReactNode }) => {
	const [exercises, setExercises] = useState<Exercise[]>([]);
	const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);
	const [exerciseIdToDelete, setExerciseIdToDelete] = useState<number | undefined>(undefined);

	const handleOpenDeleteModal = (exerciseId: number) => {
		setIsDeleteModalVisible(true);
		setExerciseIdToDelete(exerciseId);
	};

	const handleCloseDeleteModal = () => {
		setIsDeleteModalVisible(false);
		setExerciseIdToDelete(undefined);
	};

	const deleteExercise = async () => {
		const db = await dataSource();

		db.getRepository(Exercise).softDelete({ id: exerciseIdToDelete });

		handleCloseDeleteModal();

		fetchExercises();
	};

	const fetchExercises = async () => {
		const db = await dataSource();

		db.getRepository(Exercise)
			.createQueryBuilder()
			.addSelect(['*'])
			.addOrderBy('id', 'DESC')
			.limit(5)
			.execute()
			.then((response) => setExercises(response));
	};

	const storeExercise = async (data: Exercise) => {
		const db = await dataSource();

		const exercise = await db.getRepository(Exercise).save(data);

		setExercises((prevState) => [exercise, ...prevState]);
	};

	useEffect(() => {
		fetchExercises();
	}, []);

	return (
		<ExerciseContext.Provider
			value={{
				exercises,
				fetchExercises,
				storeExercise,
				isDeleteModalVisible,
				handleOpenDeleteModal,
				handleCloseDeleteModal,
				deleteExercise,
			}}
		>
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
