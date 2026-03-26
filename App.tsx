import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, TextInput } from 'react-native';
import {
	useFonts,
	Outfit_400Regular,
	Outfit_600SemiBold,
	Outfit_700Bold,
} from '@expo-google-fonts/outfit';

import { CustomStatusBar } from '~/components/atoms/status-bar';
import { MainNavigator } from '~/components/organisms/navigators/main-navigator';
import { ExerciseProvider } from '~/contexts/exercise-context';
import { ExercisesCalendarProvider } from '~/contexts/exercises-calendar-context';
import { ThemeProvider } from '~/contexts/theme-context';
import { TimerProvider } from '~/contexts/timer-context';

// @ts-expect-error Disable strict TS checking for legacy defaultProps typography injection
Text.defaultProps = Text.defaultProps || {};
// @ts-expect-error
Text.defaultProps.style = { fontFamily: 'Outfit_400Regular' };

// @ts-expect-error
TextInput.defaultProps = TextInput.defaultProps || {};
// @ts-expect-error
TextInput.defaultProps.style = { fontFamily: 'Outfit_400Regular' };

export default function App() {
	const [fontsLoaded] = useFonts({
		Outfit_400Regular,
		Outfit_600SemiBold,
		Outfit_700Bold,
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
		<SafeAreaProvider>
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
		</SafeAreaProvider>
	);
}
