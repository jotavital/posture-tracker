import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import MaskInput from 'react-native-mask-input';
import ReactNativeModal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '~/styles/colors';
import { appStyles } from './styles';

export default function App() {
	const initialTime = 0;
	const [timer, setTimer] = useState<number>(initialTime);
	const [isPaused, setIsPaused] = useState<boolean>(true);
	const [inputTime, setInputTime] = useState<string>('');
	const [isTimePickerModalVisible, setIsTimePickerModalVisible] = useState<boolean>(false);

	let seconds = Math.floor((timer / 1000) % 60);
	const minutes = Math.floor((timer / (1000 * 60)) % 60);
	const remainingPercentage = Math.floor((100 * timer) / initialTime);
	const completedPercentage = timer === 0 ? 0 : 100 - remainingPercentage;

	if (seconds === 60) {
		seconds = 0;
	}

	const handlePauseOrResumeTimer = () => {
		setIsPaused((prevState) => !prevState);
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
	}, [timer, isPaused]);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar style="auto" />

			<View style={appStyles.container}>
				<AnimatedCircularProgress
					size={300}
					width={10}
					fill={completedPercentage}
					tintColor={colors.blue}
					backgroundColor={colors.background}
					rotation={360}
					lineCap="round"
				>
					{(fill) => (
						<Pressable onPress={() => setIsTimePickerModalVisible(true)}>
							<Text style={appStyles.timerText}>{`${minutes
								.toString()
								.padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</Text>
						</Pressable>
					)}
				</AnimatedCircularProgress>
			</View>

			<ReactNativeModal
				isVisible={isTimePickerModalVisible}
				onBackdropPress={() => setIsTimePickerModalVisible(false)}
			>
				<View
					style={{
						backgroundColor: colors.white,
						borderRadius: 5,
						padding: 20,
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<Text>Minutos : Segundos</Text>
					<MaskInput
						value={inputTime}
						onChangeText={(masked, unmasked) => {
							setInputTime(unmasked);

							const splittedInputTime = masked.split(':');
							const inputMinutes = Number(splittedInputTime[0] ?? 0);
							const inputSeconds = Number(splittedInputTime[1] ?? 0);

							setTimer(inputMinutes * 60 * 1000 + inputSeconds * 1000);
						}}
						mask={[/[0-5]/, /\d/, ':', /[0-5]/, /\d/]}
						keyboardType="numeric"
						style={{ fontSize: 80 }}
						autoFocus
					/>
					<Pressable
						style={appStyles.button}
						onPress={() => setIsTimePickerModalVisible(false)}
						android_ripple={{ color: colors.transparent }}
					>
						<Text style={appStyles.buttonText}>
							<Ionicons name="checkmark-circle-outline" size={20} />
						</Text>
						<Text style={appStyles.buttonText}>Pronto</Text>
					</Pressable>
				</View>
			</ReactNativeModal>

			<View style={appStyles.buttonContainer}>
				<Pressable
					style={appStyles.button}
					onPress={() => handlePauseOrResumeTimer()}
					android_ripple={{ color: colors.transparent }}
				>
					<Text style={appStyles.buttonText}>
						<Ionicons name={isPaused ? 'play' : 'pause'} size={20} />
					</Text>
					<Text style={appStyles.buttonText}>{isPaused ? 'Começar' : 'Pausar'}</Text>
				</Pressable>

				<Pressable
					style={appStyles.button}
					onPress={() => handleResetTimer()}
					android_ripple={{ color: colors.transparent }}
				>
					<Text style={appStyles.buttonText}>
						<Ionicons name="stop" size={20} />
					</Text>
					<Text style={appStyles.buttonText}>Parar</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
}
