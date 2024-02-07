import { View } from 'react-native';
import { Button } from '~/components/atoms/button';
import { styles } from '~/components/molecules/modal-content/delete-exercise/styles';
import { useTheme } from '~/contexts/theme-context';

interface Props {
	deleteExercise: () => void;
	handleCloseDeleteModal: () => void;
}

export const DeleteExerciseModalContent: React.FC<Props> = ({
	deleteExercise,
	handleCloseDeleteModal,
}: Props) => {
	const { colors } = useTheme();

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
