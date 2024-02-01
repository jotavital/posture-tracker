import { View } from 'react-native';
import { Button } from '~/components/atoms/button';
import { styles } from '~/components/molecules/modal-content/delete-exercise/styles';
import { useExercises } from '~/contexts/exercise-context';
import { useTheme } from '~/contexts/theme-context';

export const DeleteExerciseModalContent: React.FC = () => {
	const { colors } = useTheme();
	const { deleteExercise, handleCloseDeleteModal } = useExercises();

	return (
		<View style={styles.container}>
			<Button title='Voltar' style={styles.button} onPress={handleCloseDeleteModal} />
			<Button
				title='Excluir'
				style={styles.button}
				onPress={deleteExercise}
				bg={colors.red}
				textColor={colors.white}
			/>
		</View>
	);
};
