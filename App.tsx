import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CustomStatusBar } from '~/components/atoms/status-bar';
import { MainNavigator } from '~/components/organisms/navigators/main-navigator';
import { ExerciseProvider } from '~/contexts/exercise-context';
import { ExercisesCalendarProvider } from '~/contexts/exercises-calendar-context';
import { ThemeProvider } from '~/contexts/theme-context';
import { TimerProvider } from '~/contexts/timer-context';

export default function App() {
	return (
		<NavigationContainer>
			{/* eslint-disable-next-line react-native/no-inline-styles */}
			<GestureHandlerRootView style={{ flex: 1 }}>
				<ThemeProvider>
					<ExerciseProvider>
						<ExercisesCalendarProvider>
							<TimerProvider>
								<CustomStatusBar />
								<MainNavigator />
							</TimerProvider>
						</ExercisesCalendarProvider>
					</ExerciseProvider>
				</ThemeProvider>
			</GestureHandlerRootView>
		</NavigationContainer>
	);
}
