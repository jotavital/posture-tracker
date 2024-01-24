import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MainTimer } from '~/components/organisms/main-timer';
import { TimerProvider } from '~/contexts/timer-context';
import { styles } from './styles';

export default function App() {
	return (
		<SafeAreaView style={styles.safeAreaView}>
			<StatusBar style='auto' />

			<TimerProvider>
				<MainTimer />
			</TimerProvider>
		</SafeAreaView>
	);
}
