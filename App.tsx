import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MainTimer } from '~/components/organisms/main-timer';
import { ExerciseProvider } from '~/contexts/exercise-context';
import { TimerProvider } from '~/contexts/timer-context';
import { styles } from './styles';

export default function App() {
	return (
		<SafeAreaView style={styles.safeAreaView}>
			{/* eslint-disable-next-line react-native/no-inline-styles */}
			<GestureHandlerRootView style={{ flex: 1 }}>
				<StatusBar style='auto' />

				<ExerciseProvider>
					<TimerProvider>
						<MainTimer />
					</TimerProvider>
				</ExerciseProvider>
			</GestureHandlerRootView>
		</SafeAreaView>
	);
}
