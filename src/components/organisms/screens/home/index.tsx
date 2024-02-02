import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { TimePickerModalContent } from '~/components/molecules/modal-content/time-picker';
import { TimeCompletedModalContent } from '~/components/molecules/modal-content/timer-completed';
import { TimerActionButtons } from '~/components/molecules/timer-action-buttons';
import { TimerProgressCircle } from '~/components/molecules/timer-progress-circle';
import { LatestExercises } from '~/components/organisms/latest-exercises';
import { Modal } from '~/components/organisms/modal';
import { styles } from '~/components/organisms/screens/home/styles';
import { useTimer } from '~/contexts/timer-context';
import { useSound } from '~/hooks/useSound';
import { cancelVibration, vibrateDevice } from '~/utils/vibrate';

export const HomeScreen: React.FC = () => {
	const { isPaused, hasFinished, handleResetTimer } = useTimer();
	const { stopSound, playSound } = useSound();

	const [isTimePickerModalVisible, setIsTimePickerModalVisible] = useState<boolean>(false);
	const [isTimerCompletedModalVisible, setIsTimerCompletedModalVisible] =
		useState<boolean>(false);

	const handleDismissTimerCompleted = () => {
		setIsTimerCompletedModalVisible(false);
		stopSound();
		cancelVibration();
	};

	const handleOpenTimePickerModal = () => {
		isPaused && setIsTimePickerModalVisible(true);
	};

	const handleCloseTimePickerModal = () => {
		setIsTimePickerModalVisible(false);
	};

	useEffect(() => {
		if (hasFinished) {
			handleResetTimer();
			setIsTimerCompletedModalVisible(true);
			vibrateDevice();
			playSound();
		}
	}, [hasFinished]);

	return (
		<View style={{ ...styles.container }}>
			<TimerProgressCircle handleOpenTimePickerModal={handleOpenTimePickerModal} />

			<TimerActionButtons />

			<LatestExercises />

			<Modal
				isVisible={isTimePickerModalVisible}
				onBackdropPress={handleCloseTimePickerModal}
				title='Minutos : Segundos'
			>
				<TimePickerModalContent handleCloseTimePickerModal={handleCloseTimePickerModal} />
			</Modal>

			<Modal isVisible={isTimerCompletedModalVisible} title='Tempo finalizado!'>
				<TimeCompletedModalContent
					handleDismissTimerCompleted={handleDismissTimerCompleted}
				/>
			</Modal>
		</View>
	);
};
