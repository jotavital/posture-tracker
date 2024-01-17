import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '~/styles/colors';
import { appStyles } from './styles';

export default function App() {
	const initialTime = 1 * 60 * 1000;
	const [timer, setTimer] = useState<number>(initialTime);
	const [isPaused, setIsPaused] = useState<boolean>(true);

	let seconds = Math.floor(timer / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const remainingPercentage = Math.floor((100 * timer) / initialTime);
	const completedPercentage = 100 - remainingPercentage;

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
						<Text style={appStyles.timerText}>{`${hours
							.toString()
							.padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
							.toString()
							.padStart(2, '0')}`}</Text>
					)}
				</AnimatedCircularProgress>
			</View>

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
				{timer !== initialTime && (
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
				)}
			</View>
		</SafeAreaView>
	);
}
