import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomStatusBar } from '~/components/atoms/status-bar';
import { MainNavigator } from '~/components/organisms/navigators/main-navigator';
import { ExerciseProvider } from '~/contexts/exercise-context';
import { ThemeProvider } from '~/contexts/theme-context';
import { TimerProvider } from '~/contexts/timer-context';
import { styles } from './styles';

export default function App() {
	return (
		<NavigationContainer>
			<SafeAreaView style={{ ...styles.safeAreaView }}>
				{/* eslint-disable-next-line react-native/no-inline-styles */}
				<GestureHandlerRootView style={{ flex: 1 }}>
					<ThemeProvider>
						<ExerciseProvider>
							<TimerProvider>
								<CustomStatusBar />
								<MainNavigator />
							</TimerProvider>
						</ExerciseProvider>
					</ThemeProvider>
				</GestureHandlerRootView>
			</SafeAreaView>
		</NavigationContainer>
	);
}
