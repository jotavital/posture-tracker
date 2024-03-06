import { format } from 'date-fns';
import { ReactNode, createContext, useContext, useState } from 'react';
import { DeleteExerciseModalContent } from '~/components/molecules/modal-content/delete-exercise';
import { Modal } from '~/components/organisms/modal';
import { dataSource } from '~/database';
import { Exercise } from '~/entities/Exercise';

export interface ExerciseContextValue {
	deleteExercise: () => void;
	fetchLatestExercises: () => void;
	fetchExercisesByDate: (date: Date) => Promise<Exercise[]>;
	handleCloseDeleteModal: () => void;
	handleOpenDeleteModal: (exerciseId: number) => void;
	isDeleteModalVisible: boolean;
	latestExercises: Exercise[];
	storeExercise: (data: Exercise) => void;
}

const ExerciseContext = createContext<ExerciseContextValue>({} as ExerciseContextValue);

export const ExerciseProvider = ({ children }: { children: ReactNode }) => {
	// TODO mover os state pra hooks
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

	const fetchExercisesByDate = async (date: Date) => {
		const db = await dataSource();

		return db
			.getRepository(Exercise)
			.createQueryBuilder()
			.addSelect(['*', 'date(created_at)'])
			.addOrderBy('id', 'DESC')
			.where("date(created_at, 'localtime') = :createdAt", {
				createdAt: format(date, 'y-MM-dd'),
			})
			.execute()
			.then((response: Exercise[]) => {
				return response;
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
				fetchExercisesByDate,
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
