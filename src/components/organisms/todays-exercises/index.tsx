import React from 'react';
import { Text, View } from 'react-native';
import { ExerciseInfoCard } from '~/components/molecules/exercise-info-card';
import { DeleteExerciseModalContent } from '~/components/molecules/modal-content/delete-exercise';
import { Modal } from '~/components/organisms/modal';
import { styles } from '~/components/organisms/todays-exercises/styles';
import { useExercises } from '~/contexts/exercise-context';

export const TodaysExercises: React.FC = () => {
	const { exercises, isDeleteModalVisible, handleCloseDeleteModal } = useExercises();

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Hoje</Text>
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
