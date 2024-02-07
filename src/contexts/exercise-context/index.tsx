import { format } from 'date-fns';
import { ReactNode, createContext, useContext, useState } from 'react';
import { DeleteExerciseModalContent } from '~/components/molecules/modal-content/delete-exercise';
import { Modal } from '~/components/organisms/modal';
import { dataSource } from '~/database';
import { Exercise } from '~/entities/Exercise';

export interface ExerciseContextValue {
	deleteExercise: () => void;
	fetchLatestExercises: () => void;
	fetchTodaysExercises: () => void;
	handleCloseDeleteModal: () => void;
	handleOpenDeleteModal: (exerciseId: number) => void;
	isDeleteModalVisible: boolean;
	latestExercises: Exercise[];
	storeExercise: (data: Exercise) => void;
	todaysExercises: Exercise[];
}

const ExerciseContext = createContext<ExerciseContextValue>({} as ExerciseContextValue);

export const ExerciseProvider = ({ children }: { children: ReactNode }) => {
	// TODO mover os state pra hooks
	const [todaysExercises, setTodaysExercises] = useState<Exercise[]>([]);
	const [latestExercises, setLatestExercises] = useState<Exercise[]>([]);
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

		fetchLatestExercises();
	};

	const fetchLatestExercises = async () => {
		const db = await dataSource();

		db.getRepository(Exercise)
			.createQueryBuilder()
			.addSelect(['*'])
			.addOrderBy('id', 'DESC')
			.limit(5)
			.execute()
			.then((response) => setLatestExercises(response));
	};

	const fetchTodaysExercises = async () => {
		const db = await dataSource();

		db.getRepository(Exercise)
			.createQueryBuilder()
			.addSelect(['*', 'date(created_at)'])
			.addOrderBy('id', 'DESC')
			.where("date(created_at, 'localtime') = :createdAt", {
				createdAt: format(new Date(), 'y-MM-dd'),
			})
			.execute()
			.then((response) => {
				console.log(response);
				setTodaysExercises(response);
			});
	};

	const storeExercise = async (data: Exercise) => {
		const db = await dataSource();

		const exercise = await db.getRepository(Exercise).save(data);

		setLatestExercises((prevState) => [exercise, ...prevState]);
	};

	return (
		<ExerciseContext.Provider
			value={{
				deleteExercise,
				fetchLatestExercises,
				handleCloseDeleteModal,
				handleOpenDeleteModal,
				isDeleteModalVisible,
				latestExercises,
				storeExercise,
				fetchTodaysExercises,
				todaysExercises,
			}}
		>
			{children}

			<Modal
				isVisible={isDeleteModalVisible}
				title='Tem certeza?'
				onBackdropPress={handleCloseDeleteModal}
			>
				<DeleteExerciseModalContent
					deleteExercise={deleteExercise}
					handleCloseDeleteModal={handleCloseDeleteModal}
				/>
			</Modal>
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
