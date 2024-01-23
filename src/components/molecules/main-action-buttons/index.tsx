import Ionicons from '@expo/vector-icons/Ionicons';
import { View } from 'react-native';
import { Button } from '~/components/atoms/button';
import { styles } from './styles';

interface Props {
	initialTime: number;
	timer: number;
	isPaused: boolean;
	handlePauseOrResumeTimer: () => void;
	handleResetTimer: () => void;
}

export const MainActionButtons: React.FC<Props> = ({
	initialTime,
	handlePauseOrResumeTimer,
	isPaused,
	timer,
	handleResetTimer,
}: Props) => {
	return (
		<View style={styles.buttonContainer}>
			<Button
				disabled={initialTime <= 0}
				onPress={() => handlePauseOrResumeTimer()}
				leftIcon={<Ionicons name={isPaused ? 'play' : 'pause'} size={20} />}
				title={isPaused ? 'Começar' : 'Pausar'}
			/>

			{timer !== initialTime && (
				<Button
					onPress={() => handleResetTimer()}
					leftIcon={<Ionicons name='stop' size={20} />}
					title='Parar'
				/>
			)}
		</View>
	);
};
