import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MainTimer } from '~/components/organisms/main-timer';
import { ExerciseProvider } from '~/contexts/exercise-context';
import { ThemeProvider } from '~/contexts/theme-context';
import { TimerProvider } from '~/contexts/timer-context';
import { getColors } from '~/styles/colors';
import { styles } from './styles';

export default function App() {
	const colorScheme = useColorScheme();

	const colors = getColors(colorScheme);

	return (
		<SafeAreaView style={{ ...styles.safeAreaView, backgroundColor: colors.background }}>
			{/* eslint-disable-next-line react-native/no-inline-styles */}
			<GestureHandlerRootView style={{ flex: 1 }}>
				<StatusBar style='auto' />

				<ThemeProvider>
					<ExerciseProvider>
						<TimerProvider>
							<MainTimer />
						</TimerProvider>
					</ExerciseProvider>
				</ThemeProvider>
			</GestureHandlerRootView>
		</SafeAreaView>
	);
}
