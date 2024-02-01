import React from 'react';
import { Text, View } from 'react-native';
import { ExerciseInfoCard } from '~/components/molecules/exercise-info-card';
import { DeleteExerciseModalContent } from '~/components/molecules/modal-content/delete-exercise';
import { styles } from '~/components/organisms/latest-exercises/styles';
import { Modal } from '~/components/organisms/modal';
import { useExercises } from '~/contexts/exercise-context';

export const LatestExercises: React.FC = () => {
	const { exercises, isDeleteModalVisible, handleCloseDeleteModal } = useExercises();

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Recente</Text>
			{exercises.length ? (
				<>
					{exercises.map((exercise) => {
						return <ExerciseInfoCard key={exercise.id} exercise={exercise} />;
					})}
				</>
			) : null}

			<Modal
				isVisible={isDeleteModalVisible}
				title='Tem certeza?'
				onBackdropPress={handleCloseDeleteModal}
			>
				<DeleteExerciseModalContent />
			</Modal>
		</View>
	);
};
