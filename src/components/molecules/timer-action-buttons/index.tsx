import Ionicons from '@expo/vector-icons/Ionicons';
import { View } from 'react-native';
import { Button } from '~/components/atoms/button';
import { useTimer } from '~/contexts/timer-context';
import { styles } from './styles';

interface Props {
	handlePauseOrResumeTimer: () => void;
	handleResetTimer: () => void;
}

export const TimerActionButtons: React.FC<Props> = ({
	handlePauseOrResumeTimer,
	handleResetTimer,
}: Props) => {
	const { initialTime, timer, isPaused } = useTimer();

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
