import { Audio } from 'expo-av';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Vibration } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MainActionButtons } from '~/components/molecules/main-action-buttons';
import { TimePickerModalContent } from '~/components/molecules/modal-content/time-picker';
import { TimeCompletedModalContent } from '~/components/molecules/modal-content/timer-completed';
import { ProgressWithTimer } from '~/components/molecules/progress-with-timer';
import { Modal } from '~/components/organisms/modal';

export default function App() {
	const [initialTime, setInitialTime] = useState<number>(0);
	const [timer, setTimer] = useState<number>(0);
	const [isPaused, setIsPaused] = useState<boolean>(true);
	const [timeInputValue, setTimeInputValue] = useState<string>('');
	const [isTimePickerModalVisible, setIsTimePickerModalVisible] = useState<boolean>(false);
	const [isTimerCompletedModalVisible, setIsTimerCompletedModalVisible] =
		useState<boolean>(false);
	const [sound, setSound] = useState<Audio.Sound | undefined>();
	const [completedPercentage, setCompletedPercentage] = useState<number>(0);

	const minutes = Math.floor((timer / (1000 * 60)) % 60);
	const hasFinished = timer <= 0 && completedPercentage === 100;

	let remainingPercentage = 100;
	if (initialTime > 0) {
		remainingPercentage = Math.floor((100 * timer) / initialTime);
	}

	let seconds = Math.floor((timer / 1000) % 60);
	if (seconds === 60) {
		seconds = 0;
	}

	const handlePauseOrResumeTimer = () => {
		if (timer > 0) {
			setIsPaused((prevState) => !prevState);
		}
	};

	const handleResetTimer = () => {
		setTimer(initialTime);
		setIsPaused(true);
	};

	useEffect(() => {
		if (timer <= 0 || isPaused) return;

		const timeout = setTimeout(() => {
			setTimer((prevState) => prevState - 1000);
		}, 1000);

		return () => {
			clearTimeout(timeout);
		};
	}, [timer, isPaused, completedPercentage]);

	useEffect(() => {
		handleResetTimer();
	}, [initialTime]);

	const handleDismissTimerCompleted = () => {
		sound && sound.stopAsync();
		setIsTimerCompletedModalVisible(false);
		Vibration.cancel();
	};

	useEffect(() => {
		if (isNaN(remainingPercentage)) return;

		setCompletedPercentage(100 - remainingPercentage);
	}, [remainingPercentage]);

	const playSound = async () => {
		const { sound } = await Audio.Sound.createAsync(require('~/assets/sounds/daydream.mp3'));
		setSound(sound);

		await sound.playAsync();
	};

	useEffect(() => {
		return sound
			? () => {
					sound.unloadAsync();
				}
			: undefined;
	}, [sound]);

	if (hasFinished) {
		setIsTimerCompletedModalVisible(true);
		Vibration.vibrate([500, 500], true);
		playSound();
		handleResetTimer();
	}

	const handleOpenTimePickerModal = () => {
		isPaused && setIsTimePickerModalVisible(true);
	};

	const handleCloseTimePickerModal = () => {
		setIsTimePickerModalVisible(false);
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar style='auto' />

			<ProgressWithTimer
				completedPercentage={completedPercentage}
				handleOpenTimePickerModal={handleOpenTimePickerModal}
				minutes={minutes}
				seconds={seconds}
			/>

			<MainActionButtons
				handlePauseOrResumeTimer={handlePauseOrResumeTimer}
				initialTime={initialTime}
				handleResetTimer={handleResetTimer}
				isPaused={isPaused}
				timer={timer}
			/>

			<Modal
				isVisible={isTimePickerModalVisible}
				onBackdropPress={handleCloseTimePickerModal}
				title='Minutos : Segundos'
			>
				<TimePickerModalContent
					timeInputValue={timeInputValue}
					setTimeInputValue={setTimeInputValue}
					setInitialTime={setInitialTime}
					handleCloseTimePickerModal={handleCloseTimePickerModal}
				/>
			</Modal>

			<Modal isVisible={isTimerCompletedModalVisible} title='Tempo finalizado!'>
				<TimeCompletedModalContent
					handleDismissTimerCompleted={handleDismissTimerCompleted}
				/>
			</Modal>
		</SafeAreaView>
	);
}
