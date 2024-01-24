import { useEffect, useState } from 'react';
import { TimePickerModalContent } from '~/components/molecules/modal-content/time-picker';
import { TimeCompletedModalContent } from '~/components/molecules/modal-content/timer-completed';
import { TimerActionButtons } from '~/components/molecules/timer-action-buttons';
import { TimerProgressCircle } from '~/components/molecules/timer-progress-circle';
import { Modal } from '~/components/organisms/modal';
import { useTimer } from '~/contexts/timer-context';
import { useSound } from '~/hooks/useSound';
import { cancelVibration, vibrateDevice } from '~/utils/vibrate';

export const MainTimer: React.FC = () => {
	const { isPaused, handlePauseOrResumeTimer, hasFinished, handleResetTimer } = useTimer();
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
		<>
			<TimerProgressCircle handleOpenTimePickerModal={handleOpenTimePickerModal} />

			<TimerActionButtons
				handlePauseOrResumeTimer={handlePauseOrResumeTimer}
				handleResetTimer={handleResetTimer}
			/>

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
		</>
	);
};
